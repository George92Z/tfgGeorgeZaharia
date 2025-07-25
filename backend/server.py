from flask import Flask
from flask_cors import CORS
from app.routes.usuarios import usuarios_bp
from app.routes.productos import productos_bp
from app.routes.pedidos import pedidos_bp
from app.routes.stripe_routes import stripe_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Registrar blueprints
app.register_blueprint(usuarios_bp)
app.register_blueprint(productos_bp)
app.register_blueprint(pedidos_bp)
# Registrar las rutas de Stripe
app.register_blueprint(stripe_bp)

# Configuración del servidor
API_HOST = os.getenv("API_HOST", True)
API_PORT = int(os.getenv("API_PORT", "5000"))

if __name__ == "__main__":
    app.run(host=API_HOST, port=API_PORT, debug=True)
