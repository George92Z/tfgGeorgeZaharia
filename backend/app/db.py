import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

# Configuración de conexión desde .env
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DATABASE = os.getenv("DB_DATABASE")

if DB_PASSWORD == "null":
    DB_PASSWORD = None

# Crear conexión global
conexion = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_DATABASE
)

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=None if os.getenv("DB_PASSWORD") == "null" else os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_DATABASE")
    )

def get_cursor(dictionary=True):
    conn = get_connection()
    cursor = conn.cursor(dictionary=dictionary)
    return conn, cursor