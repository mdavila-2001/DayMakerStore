from flask import Flask, render_template
from flask_restx import Api
from flask_cors import CORS  # Importar CORS
from config import Config
from models import db
from routes.usuarios import api as usuarios_ns
from routes.productos import api as productos_ns
from routes.pedidos import api as pedidos_ns
from routes.detalles_pedido import api as detalles_pedido_ns
from routes.tipo_usuarios import api as tipo_usuario_ns

app = Flask(__name__, static_url_path='/static')
app.config.from_object(Config)
CORS(app)

db.init_app(app)

api = Api(
    app,
    version='1.0',
    title='Prueba de API Backend',
    description='API REST para gestionar productos, usuarios y pedidos',
    doc='/docs'
)

api.add_namespace(usuarios_ns)
api.add_namespace(productos_ns)
api.add_namespace(pedidos_ns)
api.add_namespace(detalles_pedido_ns)
api.add_namespace(tipo_usuario_ns)

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/catalog.html')
def catalog():
    return render_template('catalog.html')

@app.route('/product.html')
def product():
    return render_template('product.html')

@app.route('/login.html')
def login():
    return render_template('login.html')

@app.route('/signup.html')
def register():
    return render_template('signup.html')

@app.route('/admin.html')
def admin():
    return render_template('admin.html')

@app.route('/admin_prod.html')
def admin_prod():
    return render_template('admin_prod.html')

if __name__ == '__main__':
    app.run(debug=True)