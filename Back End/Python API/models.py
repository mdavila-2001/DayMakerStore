from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Producto(db.Model):
    __tablename__ = 'Producto'
    
    codProd = db.Column(db.String, primary_key=True)
    nombreProd = db.Column(db.String, nullable=False)
    tipoProducto = db.Column(db.String, nullable=False)
    plataforma = db.Column(db.String, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    descuento = db.Column(db.Boolean, nullable=False)
    porcentajeDescuento = db.Column(db.Integer)
    foto = db.Column(db.String)
    combo = db.Column(db.Boolean, nullable=False)
    descProd = db.Column(db.Text)
    hayStock = db.Column(db.Boolean, nullable=False, default=True)
    stock = db.Column(db.Integer, nullable=False, default=0)

class TipoUsuario(db.Model):
    __tablename__ = 'TipoUsuario'
    IDType = db.Column(db.String, primary_key=True)
    Tipo = db.Column(db.String, nullable=False)

class Usuario(db.Model):
    __tablename__ = 'Usuario'
    
    IDUsuario = db.Column(db.CHAR, primary_key=True)
    Nombre = db.Column(db.VARCHAR, nullable=False)
    Correo = db.Column(db.VARCHAR, nullable=False)
    NombreUsuario = db.Column(db.VARCHAR, nullable=False)
    Contraseña = db.Column(db.VARCHAR, nullable=False)
    Celular = db.Column(db.VARCHAR)
    Direccion = db.Column(db.VARCHAR)
    TipoUsuarioId = db.Column(db.CHAR, db.ForeignKey('TipoUsuario.IDType')) 
    Edad = db.Column(db.Integer)

    # Relación con TipoUsuario
    tipo_usuario = db.relationship('TipoUsuario', backref='usuarios')

class Pedido(db.Model):
    __tablename__ = 'Pedido'
    IDPedido = db.Column(db.String, primary_key=True)
    IDUsuario = db.Column(db.String, db.ForeignKey('Usuario.IDUsuario'), nullable=False)
    FechaPedido = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    NIT = db.Column(db.String, nullable=False)
    Total = db.Column(db.Float, nullable=False)
    
    detalles = db.relationship('DetallePedido', backref='pedido', lazy=True)
    
    def actualizar_total(self):
        self.Total = sum(detalle.Total for detalle in self.detalles)
        db.session.commit()

class DetallePedido(db.Model):
    __tablename__ = 'DetallePedido'
    
    IDDetallePedido = db.Column(db.String, primary_key=True)
    IDPedido = db.Column(db.String, db.ForeignKey('Pedido.IDPedido'))
    codProd = db.Column(db.String, db.ForeignKey('Producto.codProd'))
    Cantidad = db.Column(db.Integer, nullable=False)
    PrecioUnitario = db.Column(db.Float, nullable=False)
    Total = db.Column(db.Float, nullable=False)

    # Relación con Producto
    producto = db.relationship('Producto', backref='detalles')

    def actualizar_precios(self):
        """Actualiza los precios basados en el producto asociado"""
        if self.producto:
            precio_base = self.producto.precio
            if self.producto.descuento:
                precio_base = precio_base * (1 - self.producto.porcentajeDescuento / 100)
            
            self.PrecioUnitario = precio_base
            self.Total = self.PrecioUnitario * self.Cantidad