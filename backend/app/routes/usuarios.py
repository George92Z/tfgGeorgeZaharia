from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.db import get_cursor,conexion
import os
import traceback
import mysql.connector
import hashlib
usuarios_bp = Blueprint('usuarios', __name__, url_prefix='/usuarios')

UPLOAD_FOLDER = './static/fotosUsuario'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'avif', 'webp', 'heic', 'heif'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@usuarios_bp.route("/", methods=["GET"])
def obtener_todos_los_usuarios():
    email = request.args.get('email')
    nombre = request.args.get('nombre')

    query = "SELECT * FROM usuarios"
    condiciones = []
    valores = []

    if email:
        condiciones.append("email LIKE %s")
        valores.append(f"%{email}%")
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

@usuarios_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    contraseña = data.get("pwd");
    pwd = hashlib.sha1(contraseña.encode()).hexdigest()
    try:
        conn, cursor = get_cursor()
        cursor.execute("SELECT * FROM usuarios WHERE email = %s AND pwd = %s", (email, pwd))
        usuario = cursor.fetchone()
        return jsonify(usuario if usuario else {"error": "Usuario no encontrado"}), 200 if usuario else 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Error interno"}), 500
    finally:
        cursor.close()
        conn.close()

@usuarios_bp.route("/<int:id>", methods=["GET"])
def obtener_usuario(id):
    try:
        conn, cursor = get_cursor()
        cursor.execute("SELECT * FROM usuarios WHERE id = %s", (id,))
        datos = cursor.fetchone()
        return jsonify(datos if datos else {"error": "Usuario no encontrado"}), 200 if datos else 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Error interno"}), 500
    finally:
        cursor.close()
        conn.close()

@usuarios_bp.route("/<int:id>", methods=["PUT"])
def actualizar_usuario(id):
    nombre = request.form.get("nombre")
    email = request.form.get("email")
    nueva_contraseña = request.form.get("pwd")
    direccion = request.form.get("direccion")
    foto_actual = request.form.get("fotoActual")
    foto_file = request.files.get("foto")
    foto = foto_actual

    try:
        conn, cursor = get_cursor(dictionary=True)

        # 🔎 Obtener la contraseña actual desde la base de datos
        cursor.execute("SELECT pwd FROM usuarios WHERE id = %s", (id,))
        usuario = cursor.fetchone()
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404

        contraseña_final = usuario["pwd"]  # Por defecto, mantener la misma

        # ⚠️ Si la contraseña fue modificada, la ciframos
        if nueva_contraseña and nueva_contraseña != usuario["pwd"]:
            contraseña_final = hashlib.sha1(nueva_contraseña.encode()).hexdigest()

        # 📸 Guardar nueva foto si se subió
        if foto_file and allowed_file(foto_file.filename):
            filename = secure_filename(foto_file.filename)
            save_path = os.path.join(UPLOAD_FOLDER, filename)
            foto_file.save(save_path)
            foto = filename
           
        # 🔄 Actualizar el usuario
        cursor.execute("""
            UPDATE usuarios
            SET nombre = %s, email = %s, pwd = %s, direccion = %s, foto = %s
            WHERE id = %s
        """, (nombre, email, contraseña_final, direccion, foto, id))
        conn.commit()
        return jsonify({"mensaje": "Usuario actualizado correctamente"})
    
    except Exception as e:
        conn.rollback()
        traceback.print_exc()
        return jsonify({"error": "Error al actualizar el usuario"}), 500
    
    finally:
        cursor.close()
        conn.close()


@usuarios_bp.route("/register", methods=["POST"])
def register():
    nombre = request.form.get("nombre")
    email = request.form.get("email")
    contraseña = request.form.get("pwd");
    pwd = hashlib.sha1(contraseña.encode()).hexdigest()
    direccion = request.form.get("direccion")
    foto_file = request.files.get("foto")

    if not nombre or not email or not pwd:
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    foto_filename = None
    if foto_file:
        if not foto_file.filename:
            return jsonify({"error": "Archivo sin nombre"}), 400
        if allowed_file(foto_file.filename):
            foto_filename = secure_filename(foto_file.filename)
            save_path = os.path.join(UPLOAD_FOLDER, foto_filename)
            foto_file.save(save_path)
        else:
            return jsonify({"error": "Formato de imagen no permitido"}), 400

    try:
        conn, cursor = get_cursor()
        cursor.execute("""
            INSERT INTO usuarios (nombre, email, pwd, direccion, rol, foto)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (nombre, email, pwd, direccion, 0, foto_filename))
        conn.commit()  # ✅ cambio importante
        nuevo_id = cursor.lastrowid

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
        conn.rollback()
        if "Duplicate entry" in str(err):
            return jsonify({"error": "El correo ya está registrado"}), 409
        return jsonify({"error": str(err)}), 500

    except Exception as e:
        conn.rollback()
        traceback.print_exc()
        return jsonify({"error": "Error en el registro"}), 500

    finally:
        cursor.close()
        conn.close()