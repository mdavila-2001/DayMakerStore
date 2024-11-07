from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, DetallePedido, Producto, Pedido
from sqlalchemy.exc import SQLAlchemyError

api = Namespace('detalles_pedido', description='Operaciones de detalles de pedido')

detalle_pedido_model = api.model('DetallePedido', {
    'IDDetallePedido': fields.String(required=True, description='ID del detalle de pedido'),
    'IDPedido': fields.String(required=True, description='ID del pedido'),
    'codProd': fields.String(required=True, description='Código del producto'),
    'Cantidad': fields.Integer(required=True, description='Cantidad'),
    'PrecioUnitario': fields.Float(required=True, description='Precio unitario del producto'),
    'Total': fields.Float(required=True, description='Total del detalle')
})

@api.route('/')
class DetallePedidoList(Resource):
    @api.doc('Listar todos los detalles de pedido')
    @api.marshal_list_with(detalle_pedido_model)
    def get(self):
        """Obtener lista de todos los detalles de pedido"""
        try:
            detalles = DetallePedido.query.all()
            return detalles
        except SQLAlchemyError as e:
            api.abort(500, f"Error de base de datos: {str(e)}")

    @api.doc('Crear un nuevo detalle de pedido')
    @api.expect(detalle_pedido_model)
    @api.marshal_with(detalle_pedido_model, code=201)
    def post(self):
        """Crear un nuevo detalle de pedido"""
        try:
            data = request.json
            
            # Verificar que exista el producto y el pedido
            producto = Producto.query.get_or_404(data['codProd'])
            pedido = Pedido.query.get_or_404(data['IDPedido'])
            
            nuevo_detalle = DetallePedido(
                IDDetallePedido=data['IDDetallePedido'],
                IDPedido=data['IDPedido'],
                codProd=data['codProd'],
                Cantidad=data['Cantidad'],
                PrecioUnitario=producto.precio,  # Usar el precio del producto
                Total=producto.precio * data['Cantidad']  # Calcular el total
            )
            
            db.session.add(nuevo_detalle)
            db.session.commit()

            # Actualizar el total del pedido sumando todos los detalles
            pedido.actualizar_total()

            return nuevo_detalle, 201
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")

@api.route('/<string:id>')
@api.param('id', 'ID del detalle de pedido')
@api.response(404, 'Detalle de pedido no encontrado')
class DetallePedidoItem(Resource):
    @api.doc('Obtener un detalle de pedido')
    @api.marshal_with(detalle_pedido_model)
    def get(self, id):
        """Obtener un detalle de pedido por su ID"""
        try:
            detalle = DetallePedido.query.get_or_404(id)
            return detalle
        except SQLAlchemyError as e:
            api.abort(500, f"Error de base de datos: {str(e)}")

    @api.doc('Actualizar un detalle de pedido')
    @api.expect(detalle_pedido_model)
    @api.marshal_with(detalle_pedido_model)
    def put(self, id):
        """Actualizar un detalle de pedido existente"""
        try:
            detalle = DetallePedido.query.get_or_404(id)
            data = request.json
            
            # Actualizar campos
            if 'codProd' in data:
                producto = Producto.query.get_or_404(data['codProd'])
                detalle.codProd = data['codProd']
                detalle.PrecioUnitario = producto.precio

            if 'Cantidad' in data:
                detalle.Cantidad = data['Cantidad']
            
            # Recalcular el total
            detalle.Total = detalle.PrecioUnitario * detalle.Cantidad
            
            db.session.commit()

            # Actualizar el total del pedido
            pedido = Pedido.query.get(detalle.IDPedido)
            pedido.actualizar_total()

            return detalle
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")

    @api.doc('Eliminar un detalle de pedido')
    @api.response(204, 'Detalle de pedido eliminado')
    def delete(self, id):
        """Eliminar un detalle de pedido"""
        try:
            detalle = DetallePedido.query.get_or_404(id)
            id_pedido = detalle.IDPedido  # Guardar el ID del pedido antes de eliminar el detalle
            
            db.session.delete(detalle)
            db.session.commit()

            # Actualizar el total del pedido después de eliminar el detalle
            pedido = Pedido.query.get(id_pedido)
            pedido.actualizar_total()

            return '', 204
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")

@api.route('/pedido/<string:id_pedido>')
@api.param('id_pedido', 'ID del pedido')
class DetallesPorPedido(Resource):
    @api.doc('Listar detalles por pedido')
    @api.marshal_list_with(detalle_pedido_model)
    def get(self, id_pedido):
        """Obtener detalles de un pedido específico"""
        try:
            detalles = DetallePedido.query.filter_by(IDPedido=id_pedido).all()
            return detalles
        except SQLAlchemyError as e:
            api.abort(500, f"Error de base de datos: {str(e)}")