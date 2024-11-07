from flask import Flask
from flask_restx import Api
from config import Config
from models import db
from apis.usuarios import api as usuarios_ns
from apis.productos import api as productos_ns
from apis.pedidos import api as pedidos_ns
from apis.detalles_pedido import api as detalles_pedido_ns
from apis.tipo_usuarios import api as tipo_usuario_ns

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

api = Api(
    app,
    version='1.0',
    title='Prueba de API Backend',
    description='API REST para gestionar productos de videojuegos',
    doc='/docs'  # URL donde se mostrará Swagger UI
)

api.add_namespace(usuarios_ns)
api.add_namespace(tipo_usuario_ns)
api.add_namespace(productos_ns)
api.add_namespace(pedidos_ns)
api.add_namespace(detalles_pedido_ns)

if __name__ == '__main__':
    app.run(debug=True)