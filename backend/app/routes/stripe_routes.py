from flask import Blueprint, request, jsonify
import stripe
import traceback
import os
from dotenv import load_dotenv
stripe_bp = Blueprint('stripe', __name__, url_prefix='/stripe')

# Tu clave secreta de Stripe (usa variable de entorno en producción)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
api_url = os.getenv("VITE_API_URL")
@stripe_bp.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        data = request.get_json()
        productos = data.get("productos", [])
        envio = data.get("envio", None)  # 👈 el envío se pasa desde el frontend
        line_items = [
            {
                "price_data": {
                    "currency": "eur",
                    "product_data": {
                        "name": producto["nombre"],
                    },
                    "unit_amount": int(float(producto["precio_unit"]) * 100),
                },
                "quantity": producto["cantidad"],
            }
            for producto in productos
        ]
        # ✅ Añadir el envío como una línea más
        if envio:
            line_items.append({
                "price_data": {
                    "currency": "eur",
                    "product_data": {
                        "name": f"Envío: {envio['nombre']}",
                    },
                    "unit_amount": int(envio["precio"] * 100),
                },
                "quantity": 1,
            })
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url = f"{api_url}/miCesta?pagado=1",
            cancel_url = f"{api_url}/miCesta?pagado=0"

        )

        return jsonify({"url": session.url})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
