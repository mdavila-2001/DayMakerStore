from flask_restx import Namespace, Resource, fields
from flask import request
from models import db, TipoUsuario

api = Namespace('tipo_usuarios', description='Operaciones de tipos de usuario')

tipo_usuario_model = api.model('TipoUsuario', {
    'IDType': fields.String(required=True, description='ID del tipo de usuario'),
    'Tipo': fields.String(required=True, description='Nombre del tipo de usuario')
})

@api.route('/')
class TipoUsuarioList(Resource):
    @api.doc('Listar todos los tipos de usuario')
    @api.marshal_list_with(tipo_usuario_model)
    def get(self):
        return TipoUsuario.query.all()

    @api.doc('Crear un nuevo tipo de usuario')
    @api.expect(tipo_usuario_model)
    @api.marshal_with(tipo_usuario_model, code=201)
    def post(self):
        data = request.json
        nuevo_tipo_usuario = TipoUsuario(**data)
        db.session.add(nuevo_tipo_usuario)
        db.session.commit()
        return nuevo_tipo_usuario, 201

@api.route('/<string:id>')
@api.param('id', 'ID del tipo de usuario')
@api.response(404, 'Tipo de usuario no encontrado')
class TipoUsuarioItem(Resource):
    @api.doc('Obtener un tipo de usuario')
    @api.marshal_with(tipo_usuario_model)
    def get(self, id):
        return TipoUsuario.query.get_or_404(id)

    @api.doc('Actualizar un tipo de usuario')
    @api.expect(tipo_usuario_model)
    @api.marshal_with(tipo_usuario_model)
    def put(self, id):
        tipo_usuario = TipoUsuario.query.get_or_404(id)
        data = request.json
        for key, value in data.items():
            setattr(tipo_usuario, key, value)
        db.session.commit()
        return tipo_usuario

    @api.doc('Eliminar un tipo de usuario')
    @api.response(204, 'Tipo de usuario eliminado')
    def delete(self, id):
        tipo_usuario = TipoUsuario.query.get_or_404(id)
        db.session.delete(tipo_usuario)
        db.session.commit()
        return '', 204