create database Final_ECommerce;


USE Final_ECommerce;

create table TipoUsuario(
	IDType char(10) NOT NULL,
	Tipo char(200) NOT NULL,
	CONSTRAINT PK_TipoUsuario PRIMARY KEY (IDType)
);

insert into TipoUsuario values ('TU-0000001', 'Cliente');
insert into TipoUsuario values ('TU-0000002', 'Administrador');

select * from TipoUsuario;

CREATE TABLE Usuario (
    IDUsuario CHAR(50) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    Celular VARCHAR(15),
    Direccion VARCHAR(255),
    TipoUsuarioId char(10),
    Edad INT,
    CONSTRAINT PK_Usuario PRIMARY KEY (IDUsuario),
    CONSTRAINT FK_Usuario_TipoUsuario FOREIGN KEY (TipoUsuarioId) REFERENCES TipoUsuario(IDType)
);

select * from Usuario;

CREATE TABLE Producto (
    codProd CHAR(10) NOT NULL,
    nombreProd VARCHAR(200) NOT NULL,
    tipoProducto VARCHAR(100) NOT NULL,
    plataforma VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descuento BIT NOT NULL,
    porcentajeDescuento INT,
    foto VARCHAR(2048),
    combo BIT NOT NULL,
    descProd TEXT,
    CONSTRAINT PK_Producto PRIMARY KEY (codProd)
);

INSERT INTO Producto (codProd, nombreProd, tipoProducto, plataforma, precio, descuento, porcentajeDescuento, foto, combo, descProd) VALUES
('P001', 'Dragon Ball Sparking Zero', 'Videojuego', 'PlayStation 5', 70.00, 1, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QQ7kP7Ve2ROtum6yLZR6XlnlaIyWuIe0Qw&s', 0, 'Dragon Ball Sparking Zero es un videojuego de lucha que permite a los jugadores experimentar combates épicos con sus personajes favoritos de la serie. Con gráficos impresionantes y un sistema de combate dinámico, revive las batallas más emocionantes del universo Dragon Ball.'),
('P002', 'PlayStation 5', 'Consola', 'PlayStation 5', 500.00, 0, 0, 'https://atlas-content-cdn.pixelsquid.com/assets_v2/245/2452423176773178782/jpeg-600/G03.jpg?modifiedAt=1', 1, 'La PlayStation 5 es la consola de videojuegos de última generación de Sony, ofreciendo un rendimiento gráfico excepcional y tiempos de carga ultrarrápidos. Con una amplia biblioteca de juegos y características innovadoras, es perfecta para los gamers más exigentes.'),
('P003', 'The Last of Us Part II', 'Videojuego', 'PlayStation 4', 59.99, 1, 15, 'https://i.ytimg.com/vi_webp/eOiUtRF8k28/maxresdefault.webp', 0, 'The Last of Us Part II es una secuela aclamada que sigue la historia de Ellie en un mundo post-apocalíptico. Con una narrativa profunda y emocional, el juego explora temas de venganza y redención mientras los jugadores enfrentan decisiones difíciles.'),
('P004', 'Halo Infinite', 'Videojuego', 'Xbox Series X/S', 59.99, 0, 0, 'https://m.media-amazon.com/images/I/81GYn0fJehL._SL1500_.jpg', 0, 'Halo Infinite es la última entrega de la icónica saga de disparos en primera persona. Los jugadores asumen el papel del Jefe Maestro en una nueva aventura épica, enfrentándose a enemigos conocidos y nuevos en un vasto mundo abierto.'),
('P005', 'Xbox Series X', 'Consola', 'Xbox Series X', 499.99, 0, 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFRrbQ9WDJ6hiIreMaoOfVVLfR6gzKlr5bw&s', 1, 'La Xbox Series X es la consola más potente de Microsoft, diseñada para ofrecer un rendimiento excepcional y gráficos de última generación. Con una amplia gama de juegos y compatibilidad con versiones anteriores, es la elección perfecta para los jugadores serios.'),
('P006', 'Nintendo Switch OLED', 'Consola', 'Nintendo Switch', 349.99, 0, 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxybOfMl4LXIEXkNqR8efIfjmTTHlGCRDrw&s', 1, 'La Nintendo Switch OLED es una versión mejorada de la popular consola híbrida, ofreciendo una pantalla más grande y vibrante. Con la capacidad de jugar en casa o en movimiento, es ideal para los amantes de los juegos de Nintendo.'),
('P007', 'Elden Ring', 'Videojuego', 'PC', 59.99, 1, 10, 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png', 0, 'Elden Ring es un emocionante videojuego de rol de acción que te lleva a un mundo de fantasía. Con una historia profunda y un mundo abierto lleno de misiones y desafíos, es un juego que te mantendrá enganchado durante horas.'),
('P008', 'Animal Crossing: New Horizons', 'Videojuego', 'Nintendo Switch', 59.99, 0, 0, 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a', 0, 'Animal Crossing: New Horizons es un videojuego de simulación de vida que te permite construir y personalizar tu propia isla. Con una variedad de actividades y personajes adorables, es un juego perfecto para relajarte y disfrutar.'),
('P009', 'NVIDIA GeForce RTX 3070', 'Componente', 'Computadoras', 499.99, 0, 0, 'https://static.gigabyte.com/StaticFile/Image/Global/cc307cf8fe9c82330869634a3539db5b/Product/26313', 0, 'La NVIDIA GeForce RTX 3070 es una tarjeta gráfica de alta gama que ofrece un rendimiento gráfico excepcional y características innovadoras. Ideal para los gamers y profesionales que requieren un rendimiento óptimo.'),
('P010', 'Logitech G502 HERO', 'Accesorio', 'Computadoras', 49.99, 1, 10, 'https://sologamerbolivia.com/cdn/shop/products/g502.png?v=1651763088', 0, 'El Logitech G502 HERO es un mouse gaming de alta calidad que ofrece una precisión y velocidad excepcionales. Con una ergonomía cómoda y botones personalizables, es perfecto para los gamers que buscan mejorar su experiencia de juego.'),
('P011', 'Razer BlackWidow Lite', 'Accesorio', 'Computadoras', 99.99, 0, 0, 'https://cellplay.com.ar/img/Public/producto-95890398-0.jpg', 0, 'El Razer BlackWidow Lite es un teclado gaming de alta calidad que ofrece una velocidad y precisión excepcionales. Con una iluminación personalizable y botones táctiles, es perfecto para los gamers que buscan mejorar su experiencia de juego.'),
('P012', 'Corsair Vengeance LPX 16GB', 'Componente', 'Computadoras', 69.99, 1, 15, 'https://m.media-amazon.com/images/I/61wCOVcyvFL._AC_UF894,1000_QL80_.jpg', 0, 'La memoria RAM Corsair Vengeance LPX 16GB es una excelente opción para mejorar el rendimiento de tu computadora. Con una velocidad de 3200MHz y una capacidad de 16GB, es perfecta para los usuarios que requieren un rendimiento óptimo.'),
('P013', 'Western Digital Black SN750', 'Componente', 'Computadoras', 129.99, 0,  0, 'https://m.media-amazon.com/images/I/71Q8Q3Q3QRL._AC_UF894,1000_QL80_.jpg', 0, 'El Western Digital Black SN750 es un disco duro de alta velocidad que ofrece un rendimiento excepcional y una capacidad de almacenamiento de hasta 1TB. Ideal para los usuarios que requieren un almacenamiento rápido y seguro.'),
('P014', 'HyperX Cloud II', 'Accesorio', 'Computadoras', 99.99, 1, 10, 'https://m.media-amazon.com/images/I/71Q8Q3Q3QRL._AC_UF894,1000_QL80_.jpg', 0, 'El HyperX Cloud II es un auricular gaming de alta calidad que ofrece un sonido excepcional y una comodidad óptima. Con una conexión inalámbrica y un micrófono de alta calidad, es perfecto para los gamers que buscan mejorar su experiencia de juego.'),
('P015', 'AMD Ryzen 5 5600X', 'Componente', 'Computadoras', 299.99, 0, 0, 'https://m.media-amazon.com/images/I/71Q8Q3Q3QRL._AC_UF894,1000_QL80_.jpg', 0, 'El AMD Ryzen 5 5600X es un procesador de alta gama que ofrece un rendimiento excepcional y una eficiencia energética óptima. Ideal para los usuarios que requieren un rendimiento óptimo para juegos y aplicaciones intensivas.'),
('P016', 'ASUS PRIME B550-PLUS', 'Componente', 'Computadoras', 129.99, 1, 10, 'https://m.media-amazon.com/images/I/71Q8Q3Q3QRL._AC_UF894,1000_QL80_.jpg', 0, 'La placa base ASUS PRIME B550-PLUS es una excelente opción para construir una computadora gaming. Con características innovadoras y una calidad de construcción óptima, es perfecta para los usuarios que buscan un rendimiento óptimo.'),
('P017', 'Corsair Hydro Series H115i RGB Platinum', 'Componente', 'Computadoras', 139.99, 0, 0, 'https://m.media-amazon.com/images/I/71Q8Q3Q3QRL._AC_UF894,1000_QL80_.jpg', 0, 'El Corsair Hydro Series H115i RGB Platinum es un sistema de refrigeración líquida de alta calidad que ofrece un rendimiento excepcional y una iluminación personalizable. Ideal para los usuarios que requieren un rendimiento óptimo y una temperatura óptima.'),
('P018', 'Samsung Odyssey G9', 'Monitor', 'Computadoras', 999.99, 0, 0, 'https://m.media-amazon.com/images/I/71Q8Q3Q3QRL._AC_UF894,1000_QL80_.jpg', 0, 'El Samsung Odyssey G9 es un monitor gaming de alta gama que ofrece un rendimiento gráfico excepcional y una pantalla curva de 49 pulgadas. Con una frecuencia de refresco de 240Hz y una respuesta de 1ms, es perfecto para los gamers que buscan una experiencia de juego inmersiva.'),
('P019', 'Razer Raptor 27', 'Monitor', 'Computadoras', 699.99, 1, 10, 'https://m.media-amazon.com/images/I/71Q8Q3Q3QRL._AC_UF894,1000_QL80_.jpg', 0, 'El Razer Raptor 27 es un monitor gaming de alta calidad que ofrece un rendimiento gráfico excepcional y una pantalla de 27 pulgadas. Con una frecuencia de refresco de 165Hz y una respuesta de 1ms, es perfecto para los gamers que buscan una experiencia de juego rápida y fluida.'),
('P020', 'Corsair Obsidian Series 7700', 'Componente', 'Computadoras', 299.99, 1, 10, 'https://assets.corsair.com/image/upload/f_auto,q_auto/content/cc-9011148-ww-1000d-hero.png', 0, 'El Corsair Obsidian Series 7700 es un gabinete de alta calidad que ofrece un diseño atractivo y una construcción robusta. Con características innovadoras y una capacidad de expansión óptima, es perfecto para los usuarios que buscan un gabinete que combine estilo y funcionalidad.');

select * from Producto;

CREATE TABLE Pedido (
    IDPedido CHAR(50) NOT NULL,
    IDUsuario CHAR(50) NOT NULL,
    FechaPedido DATETIME NOT NULL,
    NIT CHAR(100) NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    CONSTRAINT PK_Pedido PRIMARY KEY (IDPedido),
    CONSTRAINT FK_Pedido_Usuario FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);

select * from Pedido;

CREATE TABLE DetallePedido (
    IDDetallePedido CHAR(50) NOT NULL,
    IDPedido CHAR(50) NOT NULL,
    codProd CHAR(10) NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    CONSTRAINT PK_DetallePedido PRIMARY KEY (IDDetallePedido),
    CONSTRAINT FK_DetallePedido_Pedido FOREIGN KEY (IDPedido) REFERENCES Pedido(IDPedido),
    CONSTRAINT FK_DetallePedido_Producto FOREIGN KEY (codProd) REFERENCES Producto(codProd)
);

select * from DetallePedido;

SELECT @@SERVERNAME