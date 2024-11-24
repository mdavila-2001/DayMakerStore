from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, Usuario
from sqlalchemy.exc import SQLAlchemyError

api = Namespace('usuarios', description='Operaciones de usuarios')

# Modelo para la documentación de la API
usuario_model = api.model('Usuario', {
    'IDUsuario': fields.String(required=True, description='ID del usuario'),
    'Nombre': fields.String(required=False, description='Nombre legal del usuario'),
    'Correo': fields.String(required=False, description='Correo del usuario'),
    'NombreUsuario': fields.String(required=False, description='Nombre de usuario'),
    'Contraseña': fields.String(required=False, description='Contraseña del usuario'),
    'Celular': fields.String(required=False, description='Número de celular'),
    'Direccion': fields.String(required=False, description='Dirección'),
    'TipoUsuarioId': fields.String(required=False, description='ID del tipo de usuario'),
    'Edad': fields.Integer(required=False, description='Edad del usuario')
})

@api.route('/')
class UsuarioList(Resource):
    @api.doc('Listar todos los usuarios')
    @api.marshal_list_with(usuario_model)
    def get(self):
        """Obtener lista de todos los usuarios"""
        try:
            usuarios = Usuario.query.all()
            return usuarios
        except SQLAlchemyError as e:
            api.abort(500, f"Error de base de datos: {str(e)}")
    
    @api.doc('Crear un nuevo usuario')
    @api.expect(usuario_model)
    @api.marshal_with(usuario_model, code=201)
    def post(self):
        """Crear un nuevo usuario"""
        try:
            data = request.json
            
            # Asegurarse de que TipoUsuarioId sea una cadena
            tipo_usuario_id = str(data.get('TipoUsuarioId')) if data.get('TipoUsuarioId') is not None else None
            
            nuevo_usuario = Usuario(
                IDUsuario=str(data['IDUsuario']),
                Nombre=str(data['Nombre']),
                Correo=str(data['Correo']),
                NombreUsuario=str(data['NombreUsuario']),
                Contraseña=str(data['Contraseña']),
                Celular=str(data.get('Celular')) if data.get('Celular') else None,
                Direccion=str(data.get('Direccion')) if data.get('Direccion') else None,
                TipoUsuarioId=tipo_usuario_id,
                Edad=int(data.get('Edad')) if data.get('Edad') is not None else None
            )
            
            db.session.add(nuevo_usuario)
            db.session.commit()
            return nuevo_usuario, 201
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")
        except ValueError as e:
            api.abort(400, f"Error de validación: {str(e)}")

@api.route('/<string:id>')
@api.param('id', 'ID del usuario')
@api.response(404, 'Usuario no encontrado')

class UsuarioItem(Resource):
    @api.doc('Obtener un usuario')
    @api.marshal_with(usuario_model)
    def get(self, id):
        """Obtener un usuario por su ID"""
        try:
            usuario = Usuario.query.get_or_404(id)
            return usuario
        except SQLAlchemyError as e:
            api.abort(500, f"Error de base de datos: {str(e)}")

    @api.doc('Actualizar un usuario')
    @api.expect(usuario_model)
    @api.marshal_with(usuario_model)
    def put(self, id):
        """Actualizar un usuario existente"""
        try:
            usuario = Usuario.query.get_or_404(id)
            data = request.json
            
            # Actualizar campos
            usuario.Nombre = data.get('Nombre', usuario.Nombre)
            usuario.Correo = data.get('Correo', usuario.Correo)
            usuario.Celular = data.get('Celular', usuario.Celular)
            usuario.Direccion = data.get('Direccion', usuario.Direccion)
            usuario.TipoUsuarioId = data.get('TipoUsuarioId', usuario.TipoUsuarioId)
            usuario.Edad = data.get('Edad', usuario.Edad)
            
            db.session.commit()
            return usuario
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")

    @api.doc('Eliminar un usuario')
    @api.response(204, 'Usuario eliminado')
    def delete(self, id):
        """Eliminar un usuario"""
        try:
            usuario = Usuario.query.get_or_404(id)
            db.session.delete(usuario)
            db.session.commit()
            return '', 204
        except SQLAlchemyError as e:
            db.session.rollback()
            api.abort(500, f"Error de base de datos: {str(e)}")

# Ruta adicional para buscar usuarios por tipo
@api.route('/tipo/<string:tipo_id>')
@api.param('tipo_id', 'ID del tipo de usuario')
class UsuariosPorTipo(Resource):
    @api.doc('Listar usuarios por tipo')
    @api.marshal_list_with(usuario_model)
    def get(self, tipo_id):
        """Obtener usuarios por tipo"""
        try:
            return Usuario.query.filter_by(TipoUsuarioId=tipo_id).all()
        except SQLAlchemyError as e:
            api.abort(500, f"Error de base de datos: {str(e)}")