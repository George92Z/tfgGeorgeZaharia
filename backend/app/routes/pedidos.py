from flask import Blueprint, request, jsonify
from datetime import datetime
from app.db import get_cursor
import traceback

pedidos_bp = Blueprint('pedidos', __name__, url_prefix='/pedidos')

@pedidos_bp.route("/", methods=["GET"])
def obtener_todos_los_pedidos():
    try:
        conn, cursor = get_cursor()
        cursor.execute("""
            SELECT p.id, p.fecha_pedido, p.total, p.estado, 
                   e.nombre AS envio, 
                   u.nombre AS usuario_nombre, u.email, u.foto
            FROM pedidos p
            LEFT JOIN envios e ON p.envio_id = e.id
            LEFT JOIN usuarios u ON p.usuario_id = u.id
            ORDER BY p.fecha_pedido DESC
        """)
        pedidos = cursor.fetchall()
        cursor.close()

        pedidos_con_productos = []
        for pedido in pedidos:
            conn2, cursor_productos = get_cursor()
            cursor_productos.execute("""
                SELECT dp.cantidad, dp.precio_unit AS precio, pr.id, pr.nombre, pr.imagen
                FROM detalle_pedido dp
                JOIN productos pr ON dp.producto_id = pr.id
                WHERE dp.pedido_id = %s
            """, (pedido["id"],))
            productos = cursor_productos.fetchall()
            cursor_productos.close()
            conn2.close()
            pedido["productos"] = productos
            pedidos_con_productos.append(pedido)

        conn.close()
        return jsonify(pedidos_con_productos)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Error al obtener pedidos"}), 500

@pedidos_bp.route("/usuario/<int:id>", methods=["GET"])
def pedidos_por_usuario(id):
    try:
        conn, cursor = get_cursor()
        cursor.execute("""
            SELECT p.id, p.fecha_pedido, p.total, p.estado, e.nombre AS envio
            FROM pedidos p
            LEFT JOIN envios e ON p.envio_id = e.id
            WHERE p.usuario_id = %s
            ORDER BY p.fecha_pedido DESC
        """, (id,))
        pedidos = cursor.fetchall()
        cursor.close()

        pedidos_con_productos = []
        for pedido in pedidos:
            conn2, cursor_productos = get_cursor()
            cursor_productos.execute("""
                SELECT dp.cantidad, dp.precio_unit AS precio, pr.id, pr.nombre, pr.imagen
                FROM detalle_pedido dp
                JOIN productos pr ON dp.producto_id = pr.id
                WHERE dp.pedido_id = %s
            """, (pedido["id"],))
            productos = cursor_productos.fetchall()
            cursor_productos.close()
            conn2.close()
            pedido["productos"] = productos
            pedidos_con_productos.append(pedido)

        conn.close()
        return jsonify(pedidos_con_productos)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Error al obtener pedidos del usuario"}), 500

@pedidos_bp.route("/", methods=["POST"])
def crear_pedido():
    data = request.get_json()
    print("Datos recibidos en crear_pedido:", data)
    usuario_id = data.get("usuario_id")
    total = data.get("total")
    productos = data.get("productos")
    envio_id = data.get("envio_id")

    if not usuario_id or not total or not productos or not envio_id:
        return jsonify({"error": "Datos incompletos"}), 400

    try:
        conn, cursor = get_cursor()
        for item in productos:
            print("Producto recibido:", item)
            cursor.execute("SELECT stock FROM productos WHERE id = %s", (item["producto_id"],))
            producto = cursor.fetchone()
            if not producto:
                return jsonify({"error": f"Producto con ID {item['producto_id']} no encontrado"}), 404
            if (producto["stock"] + 1) < int(item["cantidad"]):
                return jsonify({"error": f"No hay suficiente stock para el producto con ID {item['producto_id']}"}), 400

        cursor.execute("""
            INSERT INTO pedidos (usuario_id, total, fecha_pedido, envio_id)
            VALUES (%s, %s, %s, %s)
        """, (usuario_id, total, datetime.now(), envio_id))
        pedido_id = cursor.lastrowid

        for item in productos:
            cursor.execute("""
                INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unit)
                VALUES (%s, %s, %s, %s)
            """, (pedido_id, item["producto_id"], item["cantidad"], item["precio_unit"]))

            cursor.execute("""
                UPDATE productos SET stock = stock - %s WHERE id = %s
            """, (item["cantidad"], item["producto_id"]))

        conn.commit()
        return jsonify({"mensaje": "Pedido creado correctamente", "pedido_id": pedido_id}), 201
    except Exception as e:
        conn.rollback()
        traceback.print_exc()
        return jsonify({"error": "Error al crear el pedido"}), 500
    finally:
        cursor.close()
        conn.close()

@pedidos_bp.route("/<int:pedido_id>/detalle", methods=["GET"])
def obtener_detalle_pedido(pedido_id):
    try:
        conn, cursor = get_cursor()
        cursor.execute("""
            SELECT dp.cantidad, dp.precio_unit, pr.nombre, pr.imagen
            FROM detalle_pedido dp
            JOIN productos pr ON dp.producto_id = pr.id
            WHERE dp.pedido_id = %s
        """, (pedido_id,))
        detalles = cursor.fetchall()
        return jsonify(detalles)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Error al obtener detalles del pedido"}), 500
    finally:
        cursor.close()
        conn.close()

@pedidos_bp.route("/<int:pedido_id>/cancelar", methods=["PUT"])
def cancelar_pedido(pedido_id):
    try:
        conn, cursor = get_cursor()
        cursor.execute("SELECT estado FROM pedidos WHERE id = %s", (pedido_id,))
        estado = cursor.fetchone()

        if not estado:
            return jsonify({"error": "Pedido no encontrado"}), 404
        if estado["estado"] not in ("pendiente", "enviado"):
            return jsonify({"error": "No se puede cancelar este pedido"}), 400

        cursor.execute("SELECT producto_id, cantidad FROM detalle_pedido WHERE pedido_id = %s", (pedido_id,))
        productos = cursor.fetchall()

        for producto in productos:
            cursor.execute("""
                UPDATE productos 
                SET stock = stock + %s 
                WHERE id = %s
            """, (producto["cantidad"], producto["producto_id"]))

        cursor.execute("UPDATE pedidos SET estado = 'cancelado' WHERE id = %s", (pedido_id,))
        conn.commit()
        return jsonify({"mensaje": "Pedido cancelado y stock restaurado correctamente"})
    except Exception as e:
        conn.rollback()
        traceback.print_exc()
        return jsonify({"error": "Error al cancelar pedido"}), 500
    finally:
        cursor.close()
        conn.close()

@pedidos_bp.route("/<int:pedido_id>", methods=["PUT"])
def actualizar_pedido_admin(pedido_id):
    estado_nuevo = request.form.get("estado")
    fecha = request.form.get("fecha_pedido")
    fecha_entrega = request.form.get("fecha_entrega")
    total = request.form.get("total")

    try:
        conn, cursor = get_cursor()
        cursor.execute("SELECT estado FROM pedidos WHERE id = %s", (pedido_id,))
        pedido_actual = cursor.fetchone()

        if not pedido_actual:
            return jsonify({"error": "Pedido no encontrado"}), 404

        estado_anterior = pedido_actual["estado"]

        cursor.execute("""
            UPDATE pedidos
            SET estado = %s, fecha_pedido = %s, fecha_entrega = %s, total = %s
            WHERE id = %s
        """, (estado_nuevo, fecha, fecha_entrega, total, pedido_id))

        if estado_nuevo == "cancelado" and estado_anterior not in ("cancelado", "entregado"):
            cursor.execute("""
                SELECT producto_id, cantidad
                FROM detalle_pedido
                WHERE pedido_id = %s
            """, (pedido_id,))
            productos = cursor.fetchall()

            for item in productos:
                cursor.execute("""
                    UPDATE productos
                    SET stock = stock + %s
                    WHERE id = %s
                """, (item["cantidad"], item["producto_id"]))

        conn.commit()
        return jsonify({"mensaje": "Pedido actualizado correctamente"})
    except Exception as e:
        conn.rollback()
        traceback.print_exc()
        return jsonify({"error": "Error al actualizar el pedido"}), 500
    finally:
        cursor.close()
        conn.close()

@pedidos_bp.route("/<int:pedido_id>", methods=["DELETE"])
def eliminar_pedido(pedido_id):
    try:
        conn, cursor = get_cursor()
        cursor.execute("SELECT estado FROM pedidos WHERE id = %s", (pedido_id,))
        estado = cursor.fetchone()

        if not estado:
            return jsonify({"error": "Pedido no encontrado"}), 404
        if estado["estado"] not in ("entregado", "cancelado"):
            return jsonify({"error": "Solo se pueden eliminar pedidos entregados o cancelados"}), 400

        cursor.execute("DELETE FROM detalle_pedido WHERE pedido_id = %s", (pedido_id,))
        cursor.execute("DELETE FROM pedidos WHERE id = %s", (pedido_id,))
        conn.commit()
        return jsonify({"mensaje": "Pedido eliminado correctamente"})
    except Exception as e:
        conn.rollback()
        traceback.print_exc()
        return jsonify({"error": "Error al eliminar pedido"}), 500
    finally:
        cursor.close()
        conn.close()

@pedidos_bp.route("/envios", methods=["GET"])
def obtener_envios():
    conn = None
    cursor = None
    try:
        conn, cursor = get_cursor()
        cursor.execute("SELECT * FROM envios")
        envios = cursor.fetchall()
        return jsonify(envios)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Error al obtener envíos"}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
