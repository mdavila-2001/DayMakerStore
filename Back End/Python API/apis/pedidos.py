from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, Pedido, Usuario
from sqlalchemy.exc import SQLAlchemyError

api = Namespace('pedidos', description='Operaciones de pedidos')

pedido_model = api.model('Pedido', {
    'IDPedido': fields.String(required=True, description='ID del pedido'),
    'IDUsuario': fields.String(required=True, description='ID del usuario'),
    'FechaPedido': fields.DateTime(required=True, description='Fecha del pedido'),
    'NIT': fields.String(required=True, description='NIT'),
    'Total': fields.Float(required=True, description='Total del pedido')
})

@api.route('/')
class PedidoList(Resource):
    @api.doc('Listar todos los pedidos')
    @api.marshal_list_with(pedido_model)
    def get(self):
        return Pedido.query.all()

    @api.doc('Crear un nuevo pedido')
    @api.expect(pedido_model)
    @api.marshal_with(pedido_model, code=201)
    def post(self):
        try:
            data = request.json
            
            # Verificar que el usuario existe y es un cliente
            usuario = Usuario.query.get_or_404(data['IDUsuario'])
            
            # Verificar si el usuario es un cliente (TipoUsuarioId = 1)
            if usuario.TipoUsuarioId != "1":
                api.abort(403, "Error: Solo los clientes pueden crear pedidos. Los administradores no están autorizados para realizar compras.")
            
            nuevo_pedido = Pedido(
                IDPedido=data['IDPedido'],
                IDUsuario=data['IDUsuario'],
                NIT=data['NIT'],
                Total=0  # Inicializar con total 0
            )
            db.session.add(nuevo_pedido)
            db.session.commit()
            return nuevo_pedido, 201
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")

@api.route('/<string:id>')
@api.param('id', 'ID del pedido')
@api.response(404, 'Pedido no encontrado')
class PedidoItem(Resource):
    @api.doc('Obtener un pedido')
    @api.marshal_with(pedido_model)
    def get(self, id):
        return Pedido.query.get_or_404(id)

    @api.doc('Actualizar un pedido')
    @api.expect(pedido_model)
    @api.marshal_with(pedido_model)
    def put(self, id):
        try:
            pedido = Pedido.query.get_or_404(id)
            data = request.json
            
            # Si se está cambiando el usuario, verificar que el nuevo usuario sea un cliente
            if 'IDUsuario' in data and data['IDUsuario'] != pedido.IDUsuario:
                nuevo_usuario = Usuario.query.get_or_404(data['IDUsuario'])
                if nuevo_usuario.TipoUsuarioId != "1":
                    api.abort(403, "Error: Solo se puede asignar el pedido a usuarios que sean clientes")
            
            for key, value in data.items():
                setattr(pedido, key, value)
            
            db.session.commit()
            return pedido
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")

    @api.doc('Eliminar un pedido')
    @api.response(204, 'Pedido eliminado')
    def delete(self, id):
        try:
            pedido = Pedido.query.get_or_404(id)
            db.session.delete(pedido)
            db.session.commit()
            return '', 204
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")

# Ruta adicional para obtener pedidos por usuario
@api.route('/usuario/<string:id_usuario>')
@api.param('id_usuario', 'ID del usuario')
class PedidosPorUsuario(Resource):
    @api.doc('Listar pedidos por usuario')
    @api.marshal_list_with(pedido_model)
    def get(self, id_usuario):
        """Obtener pedidos de un usuario específico"""
        try:
            # Verificar que el usuario existe
            usuario = Usuario.query.get_or_404(id_usuario)
            return Pedido.query.filter_by(IDUsuario=id_usuario).all()
        except SQLAlchemyError as e:
            api.abort(500, f"Error de base de datos: {str(e)}")