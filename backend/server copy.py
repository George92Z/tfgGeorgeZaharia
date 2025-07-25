from flask import Flask, jsonify,request
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from datetime import datetime
import os
load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/static/*": {"origins": "*"}})
host = os.getenv("DB_HOST")
user = os.getenv("DB_USER")
database = os.getenv("DB_DATABASE")
password = os.getenv("DB_PASSWORD")
api_port = os.getenv("API_PORT")
api_host = os.getenv("API_HOST")
if password == "null":
    password = None

#Conexión con tu base de datos (phpMyAdmin)
conexion = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)

@app.route("/usuarios", methods=["GET"])
def obtener_todos_los_usuarios():
    email = request.args.get('email')
    nombre = request.args.get('nombre')

    query = "SELECT * FROM usuarios"
    condiciones = []
    valores = []

    if email:
        condiciones.append("email = %s")
        valores.append(email)
    if nombre:
        condiciones.append("nombre LIKE %s")
        valores.append(f"%{nombre}%")

    if condiciones:
        query += " WHERE " + " AND ".join(condiciones)

    cursor = None
    try:
        cursor = conexion.cursor(dictionary=True)
        cursor.execute(query, valores)
        datos = cursor.fetchall()
        return jsonify(datos)
    except Exception as e:
        print(f"Error en obtener_todos_los_usuarios: {e}")
        return jsonify({"error": "Error interno"}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/login", methods=["POST"])
def login():
    #le pasamos mediante el body el email y la contraseña
    #en el body se envian los datos en formato json, ver como se hace en la pagina tsx.
    data = request.get_json()
    email = data.get('email')
    pwd = data.get('pwd')
    cursor = conexion.cursor(dictionary=True, buffered=True)
    cursor.execute("SELECT * FROM usuarios WHERE email = %s AND pwd = %s", (email, pwd))
    usuario = cursor.fetchone()
    cursor.close()

    if usuario:
        return jsonify(usuario)
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
@app.route("/usuarios/<int:id>", methods=["GET"])
def obtener_usuario(id):
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE id = %s", (id,))
    datos = cursor.fetchone()  #fetchone() porque es solo uno
    cursor.close()

    if datos:
        return jsonify(datos)
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
@app.route("/usuarios/<int:id>", methods=["PUT"])
def actualizar_usuario(id):
    UPLOAD_FOLDER = './static/fotosUsuario'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif','avif'}
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    nombre = request.form.get("nombre")
    email = request.form.get("email")
    pwd = request.form.get("pwd")
    direccion = request.form.get("direccion")
    foto_actual = request.form.get("fotoActual")
    foto_file = request.files.get("foto")

    # Foto final por defecto: la actual
    foto = foto_actual

    if foto_file and allowed_file(foto_file.filename):
        filename = secure_filename(foto_file.filename)
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        foto_file.save(save_path)
        foto = filename  # usamos la nueva

    cursor = conexion.cursor()
    cursor.execute("""
        UPDATE usuarios
        SET nombre = %s, email = %s, pwd = %s, direccion = %s, foto = %s
        WHERE id = %s
    """, (nombre, email, pwd, direccion, foto, id))
    conexion.commit()
    cursor.close()

    return jsonify({"mensaje": "Usuario actualizado correctamente"})



#parte de registro de usuario:
@app.route("/register", methods=["POST"])
def register():
    UPLOAD_FOLDER = './static/fotosUsuario'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif','avif'}
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    def allowed_file(filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    nombre = request.form.get("nombre")
    email = request.form.get("email")
    pwd = request.form.get("pwd")
    direccion = request.form.get("direccion")
    foto_file = request.files.get("foto")

    if not nombre or not email or not pwd:
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    foto_filename = None
    if foto_file and allowed_file(foto_file.filename):
        foto_filename = secure_filename(foto_file.filename)
        save_path = os.path.join(UPLOAD_FOLDER, foto_filename)
        foto_file.save(save_path)

    cursor = conexion.cursor()
    try:
        cursor.execute("""
            INSERT INTO usuarios (nombre, email, pwd, direccion, rol, foto)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (nombre, email, pwd, direccion, 0, foto_filename))
        conexion.commit()
        nuevo_id = cursor.lastrowid
        cursor.close()

        return jsonify({
            "id": nuevo_id,
            "nombre": nombre,
            "email": email,
            "pwd": pwd,
            "direccion": direccion,
            "rol": 0,
            "foto": foto_filename
        }), 201

    except mysql.connector.IntegrityError as err:
        conexion.rollback()
        cursor.close()
        if "Duplicate entry" in str(err):
            return jsonify({"error": "El correo ya está registrado"}), 409
        else:
            return jsonify({"error": str(err)}), 500

    

#parte de los productos:
@app.route("/productos", methods=["GET"])
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

    cursor = None
    try:
        cursor = conexion.cursor(dictionary=True)
        cursor.execute(query, valores)
        datos = cursor.fetchall()
        return jsonify(datos)
    except Exception as e:
        print(f"Error en obtener_todos_los_productos: {e}")
        return jsonify({"error": "Error interno"}), 500
    finally:
        if cursor:
            cursor.close()

@app.route("/productos/<int:id>", methods=["GET"])
def obtener_producto(id):
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM productos WHERE id = %s", (id,))
    producto = cursor.fetchone()
    cursor.close()

    if producto:
        return jsonify(producto)
    else:
        return jsonify({"error": "Producto no encontrado"}), 404

@app.route("/productos", methods=["POST"])
def crear_producto():
    UPLOAD_FOLDER = './static/fotosProducto'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif','avif','webp'}
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    def allowed_file(filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    nombre = request.form.get("nombre")
    descripcion = request.form.get("descripcion")
    precio = request.form.get("precio")
    stock = request.form.get("stock")
    imagen_file = request.files.get("imagen")

    if not nombre or not precio or not stock:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    #Validar tipos
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

    cursor = conexion.cursor()
    try:
        cursor.execute("""
            INSERT INTO productos (nombre, descripcion, precio, stock, imagen)
            VALUES (%s, %s, %s, %s, %s)
        """, (nombre, descripcion, precio, stock, imagen_filename))
        conexion.commit()
        nuevo_id = cursor.lastrowid
        cursor.close()

        return jsonify({
            "id": nuevo_id,
            "nombre": nombre,
            "descripcion": descripcion,
            "precio": precio,
            "stock": stock,
            "imagen": imagen_filename
        }), 201

    except mysql.connector.Error as err:
        conexion.rollback()
        cursor.close()
        return jsonify({"error": str(err)}), 500
    
@app.route("/productos/<int:id>", methods=["DELETE"])
def eliminar_producto(id):
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM productos WHERE id = %s", (id,))
    conexion.commit()
    cursor.close()
    return jsonify({"mensaje": "Producto eliminado"}), 200
    
@app.route("/productos/<int:id>", methods=["PUT"])
def actualizar_producto(id):
    UPLOAD_FOLDER = './static/fotosProducto'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif','avif','webp'}
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    nombre = request.form.get("nombre")
    descripcion = request.form.get("descripcion")
    precio = request.form.get("precio")
    stock = request.form.get("stock")
    imagen_actual = request.form.get("imagenActual")  # nombre de la imagen anterior
    imagen_nueva = request.files.get("imagen")        # archivo nuevo

    imagen_final = imagen_actual  # por defecto se mantiene la anterior

    if imagen_nueva and allowed_file(imagen_nueva.filename):
        filename = secure_filename(imagen_nueva.filename)
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        imagen_nueva.save(save_path)
        imagen_final = filename  # ahora se usará la nueva

    cursor = conexion.cursor()
    cursor.execute("""
        UPDATE productos
        SET nombre = %s, descripcion = %s, precio = %s, stock = %s, imagen = %s
        WHERE id = %s
    """, (nombre, descripcion, precio, stock, imagen_final, id))
    conexion.commit()
    cursor.close()

    return jsonify({"mensaje": "Producto actualizado correctamente"})

@app.route("/pedidos", methods=["POST"])
def crear_pedido():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    total = data.get("total")
    productos = data.get("productos")
    envio_id = data.get("envio_id")

    if not usuario_id or not total or not productos or not envio_id:
        return jsonify({"error": "Datos incompletos"}), 400

    cursor = conexion.cursor(dictionary=True)
    try:
        #Verificar stock disponible
        for item in productos:
            cursor.execute("SELECT stock FROM productos WHERE id = %s", (item["producto_id"],))
            producto = cursor.fetchone()
            if not producto:
                return jsonify({"error": f"Producto con ID {item['producto_id']} no encontrado"}), 404
            if producto["stock"] < item["cantidad"]:
                return jsonify({"error": f"No hay suficiente stock para el producto con ID {item['producto_id']}"}), 400

        #Crear pedido
        cursor.execute("""
            INSERT INTO pedidos (usuario_id, total, fecha_pedido, envio_id)
            VALUES (%s, %s, %s, %s)
        """, (usuario_id, total, datetime.now(), envio_id))
        pedido_id = cursor.lastrowid

        #Insertar productos y actualizar stock
        for item in productos:
            # Insertar en detalle_pedido
            cursor.execute("""
                INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unit)
                VALUES (%s, %s, %s, %s)
            """, (
                pedido_id,
                item["producto_id"],
                item["cantidad"],
                item["precio_unit"]
            ))

            #Actualizar stock del producto
            cursor.execute("""
                UPDATE productos SET stock = stock - %s WHERE id = %s
            """, (item["cantidad"], item["producto_id"]))

        conexion.commit()
        return jsonify({"mensaje": "Pedido creado correctamente", "pedido_id": pedido_id}), 201

    except Exception as e:
        conexion.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()

@app.route("/envios", methods=["GET"])
def obtener_envios():
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM envios")
    envios = cursor.fetchall()  # ✅ Se están consumiendo los resultados
    cursor.close()
    return jsonify(envios)

@app.route("/pedidos/usuario/<int:id>", methods=["GET"])
def pedidos_por_usuario(id):
    cursor = conexion.cursor(dictionary=True)

    cursor.execute("""
        SELECT p.id, p.fecha_pedido, p.total, p.estado, e.nombre AS envio
        FROM pedidos p
        LEFT JOIN envios e ON p.envio_id = e.id
        WHERE p.usuario_id = %s
        ORDER BY p.fecha_pedido DESC
    """, (id,))
    
    pedidos = cursor.fetchall()  # ✅ lee todos los resultados
    pedidos_con_productos = []

    for pedido in pedidos:
        # ⚠️ Usa un cursor nuevo para esta segunda consulta
        cursor_productos = conexion.cursor(dictionary=True)
        cursor_productos.execute("""
            SELECT dp.cantidad, dp.precio_unit AS precio, pr.id, pr.nombre, pr.imagen
            FROM detalle_pedido dp
            JOIN productos pr ON dp.producto_id = pr.id
            WHERE dp.pedido_id = %s
        """, (pedido["id"],))
        productos = cursor_productos.fetchall()
        pedido["productos"] = productos
        pedidos_con_productos.append(pedido)
        cursor_productos.close()  # ✅ muy importante cerrar

    cursor.close()
    return jsonify(pedidos_con_productos)

@app.route("/pedidos", methods=["GET"])
def obtener_todos_los_pedidos():
    cursor = conexion.cursor(dictionary=True)

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
        cursor_productos = conexion.cursor(dictionary=True)
        cursor_productos.execute("""
            SELECT dp.cantidad, dp.precio_unit AS precio, pr.id, pr.nombre, pr.imagen
            FROM detalle_pedido dp
            JOIN productos pr ON dp.producto_id = pr.id
            WHERE dp.pedido_id = %s
        """, (pedido["id"],))
        productos = cursor_productos.fetchall()
        cursor_productos.close()
        pedido["productos"] = productos
        pedidos_con_productos.append(pedido)

    return jsonify(pedidos_con_productos)


@app.route("/pedidos/<int:pedido_id>/detalle", methods=["GET"])
def obtener_detalle_pedido(pedido_id):
    cursor = conexion.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT dp.cantidad, dp.precio_unit, pr.nombre, pr.imagen
            FROM detalle_pedido dp
            JOIN productos pr ON dp.producto_id = pr.id
            WHERE dp.pedido_id = %s
        """, (pedido_id,))
        detalles = cursor.fetchall()
        return jsonify(detalles)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()

@app.route("/pedidos/<int:pedido_id>/cancelar", methods=["PUT"])
def cancelar_pedido(pedido_id):
    cursor = conexion.cursor()
    try:
        # Verificar estado actual
        cursor.execute("SELECT estado FROM pedidos WHERE id = %s", (pedido_id,))
        estado = cursor.fetchone()

        if not estado:
            return jsonify({"error": "Pedido no encontrado"}), 404
        if estado[0] not in ("pendiente", "enviado"):
            return jsonify({"error": "No se puede cancelar este pedido"}), 400

        # Obtener productos del pedido
        cursor.execute("""
            SELECT producto_id, cantidad 
            FROM detalle_pedido 
            WHERE pedido_id = %s
        """, (pedido_id,))
        productos = cursor.fetchall()

        # Restaurar stock
        for producto in productos:
            cursor.execute("""
                UPDATE productos 
                SET stock = stock + %s 
                WHERE id = %s
            """, (producto[1], producto[0]))

        # Cambiar estado del pedido
        cursor.execute("UPDATE pedidos SET estado = 'cancelado' WHERE id = %s", (pedido_id,))

        conexion.commit()
        return jsonify({"mensaje": "Pedido cancelado y stock restaurado correctamente"})

    except Exception as e:
        conexion.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()


@app.route("/pedidos/<int:pedido_id>", methods=["DELETE"])
def eliminar_pedido(pedido_id):
    cursor = conexion.cursor()
    try:
        cursor.execute("SELECT estado FROM pedidos WHERE id = %s", (pedido_id,))
        estado = cursor.fetchone()

        if not estado:
            return jsonify({"error": "Pedido no encontrado"}), 404
        if estado[0] not in ("entregado", "cancelado"):
            return jsonify({"error": "Solo se pueden eliminar pedidos entregados o cancelados"}), 400

        cursor.execute("DELETE FROM detalle_pedido WHERE pedido_id = %s", (pedido_id,))
        cursor.execute("DELETE FROM pedidos WHERE id = %s", (pedido_id,))
        conexion.commit()
        return jsonify({"mensaje": "Pedido eliminado correctamente"})
    except Exception as e:
        conexion.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()

@app.route("/pedidos/<int:pedido_id>", methods=["PUT"])
def actualizar_pedido_admin(pedido_id):
    estado_nuevo = request.form.get("estado")
    fecha = request.form.get("fecha_pedido")
    fecha_entrega = request.form.get("fecha_entrega")
    total = request.form.get("total")
    cursor = conexion.cursor(dictionary=True)

    try:
        # 1. Obtener el estado actual del pedido
        cursor.execute("SELECT estado FROM pedidos WHERE id = %s", (pedido_id,))
        pedido_actual = cursor.fetchone()
        if not pedido_actual:
            return jsonify({"error": "Pedido no encontrado"}), 404

        estado_anterior = pedido_actual["estado"]

        # 2. Actualizar el pedido
        cursor.execute("""
            UPDATE pedidos
            SET estado = %s, fecha_pedido = %s, fecha_entrega = %s, total = %s
            WHERE id = %s
        """, (estado_nuevo, fecha, fecha_entrega, total, pedido_id))

        # 3. Si el nuevo estado es "cancelado" y antes no lo estaba, restaurar stock
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

        conexion.commit()
        return jsonify({"mensaje": "Pedido actualizado correctamente"})

    except Exception as e:
        conexion.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()


if __name__ == "__main__":
    app.run(host=api_host, port=int(api_port), debug=True)