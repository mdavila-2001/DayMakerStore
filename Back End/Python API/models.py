from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Producto(db.Model):
    __tablename__ = 'Producto'
    
    codProd = db.Column(db.String(10), primary_key=True)
    nombreProd = db.Column(db.String(200), nullable=False)
    tipoProducto = db.Column(db.String(100), nullable=False)
    plataforma = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    descuento = db.Column(db.Boolean, nullable=False)
    porcentajeDescuento = db.Column(db.Integer)
    foto = db.Column(db.String(2048))
    combo = db.Column(db.Boolean, nullable=False)
    descProd = db.Column(db.Text)

class TipoUsuario(db.Model):
    __tablename__ = 'TipoUsuario'
    IDType = db.Column(db.String(10), primary_key=True)
    Tipo = db.Column(db.String(200), nullable=False)

class Usuario(db.Model):
    __tablename__ = 'Usuario'
    
    IDUsuario = db.Column(db.CHAR(50), primary_key=True)  # Cambiado a CHAR para coincidir con SQL
    Nombre = db.Column(db.VARCHAR(100), nullable=False)
    Correo = db.Column(db.VARCHAR(100), nullable=False)
    Celular = db.Column(db.VARCHAR(15))
    Direccion = db.Column(db.VARCHAR(255))
    TipoUsuarioId = db.Column(db.CHAR(10), db.ForeignKey('TipoUsuario.IDType'))  # Cambiado a CHAR
    Edad = db.Column(db.Integer)

    # Relación con TipoUsuario
    tipo_usuario = db.relationship('TipoUsuario', backref='usuarios')

class Pedido(db.Model):
    __tablename__ = 'Pedido'
    IDPedido = db.Column(db.String(50), primary_key=True)
    IDUsuario = db.Column(db.String(50), db.ForeignKey('Usuario.IDUsuario'), nullable=False)
    FechaPedido = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    NIT = db.Column(db.String(100), nullable=False)
    Total = db.Column(db.Float, nullable=False)
    
    def actualizar_total(self):
        self.Total = sum(detalle.Total for detalle in self.detalles)
        db.session.commit()

class DetallePedido(db.Model):
    __tablename__ = 'DetallePedido'
    IDDetallePedido = db.Column(db.String(50), primary_key=True)
    IDPedido = db.Column(db.String(50), db.ForeignKey('Pedido.IDPedido'), nullable=False)
    codProd = db.Column(db.String(10), db.ForeignKey('Producto.codProd'), nullable=False)
    Cantidad = db.Column(db.Integer, nullable=False)
    PrecioUnitario = db.Column(db.Float, nullable=False)
    Total = db.Column(db.Float, nullable=False)
    producto = db.relationship('Producto', backref='detalles_pedido')
    pedido = db.relationship('Pedido', backref='detalles')
    
    # Métodos para calcular precios
    def calcular_precio_unitario(self):
        if self.producto.descuento:
            return self.producto.precio * (1 - self.producto.porcentajeDescuento / 100)
        return self.producto.precio
    
    def calcular_total(self):
        return self.PrecioUnitario * self.Cantidad