from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.db import get_cursor
import os
import traceback

productos_bp = Blueprint('productos', __name__, url_prefix='/productos')

UPLOAD_FOLDER = './static/fotosProducto'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'avif', 'webp'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@productos_bp.route("/", methods=["GET"])
def obtener_todos_los_productos():
    nombre = request.args.get('nombre')
    query = "SELECT * FROM productos"
    condiciones = []
    valores = []

    if nombre:
        condiciones.append("nombre LIKE %s")
        valores.append(f"%{nombre}%")

    if condiciones:
        query += " WHERE " + " AND ".join(condiciones)

    try:
        conn, cursor = get_cursor()
        cursor.execute(query, valores)
        datos = cursor.fetchall()
        return jsonify(datos)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Error interno"}), 500
    finally:
        cursor.close()
        conn.close()

@productos_bp.route("/<int:id>", methods=["GET"])
def obtener_producto(id):
    try:
        conn, cursor = get_cursor()
        cursor.execute("SELECT * FROM productos WHERE id = %s", (id,))
        producto = cursor.fetchone()
        return jsonify(producto if producto else {"error": "Producto no encontrado"}), 200 if producto else 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Error interno"}), 500
    finally:
        cursor.close()
        conn.close()

@productos_bp.route("/", methods=["POST"])
def crear_producto():
    nombre = request.form.get("nombre")
    descripcion = request.form.get("descripcion")
    precio = request.form.get("precio")
    stock = request.form.get("stock")
    imagen_file = request.files.get("imagen")

    if not nombre or not precio or not stock:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    try:
        precio = float(precio)
        stock = int(stock)
    except ValueError:
        return jsonify({"error": "Precio o stock no válido"}), 400

    imagen_filename = None
    if imagen_file and allowed_file(imagen_file.filename):
        imagen_filename = secure_filename(imagen_file.filename)
        save_path = os.path.join(UPLOAD_FOLDER, imagen_filename)
        imagen_file.save(save_path)

    try:
        conn, cursor = get_cursor()
        cursor.execute("""
            INSERT INTO productos (nombre, descripcion, precio, stock, imagen)
            VALUES (%s, %s, %s, %s, %s)
        """, (nombre, descripcion, precio, stock, imagen_filename))
        conn.commit()  # 👈 corregido
        nuevo_id = cursor.lastrowid
        return jsonify({
            "id": nuevo_id,
            "nombre": nombre,
            "descripcion": descripcion,
            "precio": precio,
            "stock": stock,
            "imagen": imagen_filename
        }), 201
    except Exception as e:
        conn.rollback()  # 👈 corregido
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@productos_bp.route("/<int:id>", methods=["PUT"])
def actualizar_producto(id):
    nombre = request.form.get("nombre")
    descripcion = request.form.get("descripcion")
    precio = request.form.get("precio")
    stock = request.form.get("stock")
    imagen_actual = request.form.get("imagenActual")
    imagen_nueva = request.files.get("imagen")
    imagen_final = imagen_actual

    if imagen_nueva and allowed_file(imagen_nueva.filename):
        filename = secure_filename(imagen_nueva.filename)
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        imagen_nueva.save(save_path)
        imagen_final = filename

    try:
        conn, cursor = get_cursor()
        cursor.execute("""
            UPDATE productos
            SET nombre = %s, descripcion = %s, precio = %s, stock = %s, imagen = %s
            WHERE id = %s
        """, (nombre, descripcion, precio, stock, imagen_final, id))
        conn.commit()
        return jsonify({"mensaje": "Producto actualizado correctamente"})
    except Exception as e:
        conn.rollback()  # 👈 corregido
        traceback.print_exc()
        return jsonify({"error": "Error al actualizar producto"}), 500
    finally:
        cursor.close()
        conn.close()

@productos_bp.route("/<int:id>", methods=["DELETE"])
def eliminar_producto(id):
    try:
        conn, cursor = get_cursor()
        cursor.execute("DELETE FROM productos WHERE id = %s", (id,))
        conn.commit()
        return jsonify({"mensaje": "Producto eliminado"}), 200
    except Exception as e:
        conn.rollback()
        traceback.print_exc()
        return jsonify({"error": "Error al eliminar producto"}), 500
    finally:
        cursor.close()
        conn.close()