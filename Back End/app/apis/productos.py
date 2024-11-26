from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, Producto

api = Namespace('productos', description='Operaciones de productos')

# Definir el modelo para Swagger
producto_model = api.model('Producto', {
    'codProd': fields.String(required=True, description='Código del producto'),
    'nombreProd': fields.String(required=True, description='Nombre del producto'),
    'tipoProducto': fields.String(required=True, description='Tipo de producto'),
    'plataforma': fields.String(required=True, description='Plataforma'),
    'precio': fields.Float(required=True, description='Precio'),
    'descuento': fields.Boolean(required=True, description='¿Tiene descuento?'),
    'porcentajeDescuento': fields.Integer(description='Porcentaje de descuento'),
    'foto': fields.String(description='URL de la foto'),
    'combo': fields.Boolean(required=True, description='¿Es combo?'),
    'descProd': fields.String(description='Descripción del producto'),
    'hayStock': fields.Boolean(required=True, description='¿Hay stock?'),  # Nuevo campo
    'stock': fields.Integer(required=True, description='Cantidad en stock')  # Nuevo campo
})

@api.route('/')
class ProductoList(Resource):
    @api.doc('Obtener todos los productos')
    @api.marshal_list_with(producto_model)
    def get(self):
        """Obtener lista de todos los productos"""
        return Producto.query.all()

    @api.doc('Crear un nuevo producto')
    @api.expect(producto_model)
    @api.marshal_with(producto_model, code=201)
    def post(self):
        """Crear un nuevo producto"""
        data = request.json
        nuevo_producto = Producto(**data)
        db.session.add(nuevo_producto)
        db.session.commit()
        return nuevo_producto, 201

@api.route('/<string:codProd>')
@api.param('codProd', 'Código del producto')
@api.response(404, 'Producto no encontrado')
class ProductoItem(Resource):
    @api.doc('Obtener un producto específico')
    @api.marshal_with(producto_model)
    def get(self, codProd):
        """Obtener un producto por su código"""
        return Producto.query.get_or_404(codProd)

    @api.doc('Actualizar un producto')
    @api.expect(producto_model)
    @api.marshal_with(producto_model)
    def put(self, codProd):
        """Actualizar un producto existente"""
        producto = Producto.query.get_or_404(codProd)
        data = request.json
        for key, value in data.items():
            setattr(producto, key, value)
        db.session.commit()
        return producto

    @api.doc('Eliminar un producto')
    @api.response(204, 'Producto eliminado')
    def delete(self, codProd):
        """Eliminar un producto"""
        producto = Producto.query.get_or_404(codProd)
        db.session.delete(producto)
        db.session.commit()
        return '', 204