from flask import Flask, jsonify,request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Conexión con tu base de datos (phpMyAdmin)
conexion = mysql.connector.connect(
    host="localhost",
    user="root",           # o el usuario que tengas
    password="",           # tu contraseña, si tienes
    database="usuarios"  # cambia por el nombre real
)

@app.route("/usuarios", methods=["GET"])
def obtener_todos_los_usuarios():
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios")  # tu tabla
    datos = cursor.fetchall()
    cursor.close()
    return jsonify(datos)

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
    datos = request.json
    nombre = datos.get("nombre")
    email = datos.get("email")
    edad = datos.get("edad")
    contrasenia = datos.get("contrasenia")
    activo = datos.get("activo")

    cursor = conexion.cursor()
    cursor.execute("""
        UPDATE usuarios
        SET nombre = %s, email = %s, edad = %s, contrasenia = %s, activo = %s
        WHERE id = %s
    """, (nombre, email, edad, contrasenia,activo, id))
    conexion.commit()
    cursor.close()

    return jsonify({"mensaje": "Usuario actualizado correctamente"})

if __name__ == "__main__":
    app.run(debug=True)
