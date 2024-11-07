const productos = [
    {
        codigo: "P001",
        nombre: "Dragon Ball Sparking Zero",
        tipoProducto: "Videojuego",
        plataforma: "PlayStation 5",
        precio: 70,
        descuento: true,
        porcentajeDescuento: 10,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QQ7kP7Ve2ROtum6yLZR6XlnlaIyWuIe0Qw&s",
        combo: false,
        descripcion: "Dragon Ball Sparking Zero es un videojuego de lucha que permite a los jugadores experimentar combates épicos con sus personajes favoritos de la serie. Con gráficos impresionantes y un sistema de combate dinámico, revive las batallas más emocionantes del universo Dragon Ball."
    },
    {
        codigo: "P002",
        nombre: "PlayStation 5",
        tipoProducto: "Consola",
        plataforma: "PlayStation 5",
        precio: 500,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://atlas-content-cdn.pixelsquid.com/assets_v2/245/2452423176773178782/jpeg-600/G03.jpg?modifiedAt=1",
        combo: true,
        descripcion: "La PlayStation 5 es la consola de videojuegos de última generación de Sony, ofreciendo un rendimiento gráfico excepcional y tiempos de carga ultrarrápidos. Con una amplia biblioteca de juegos y características innovadoras, es perfecta para los gamers más exigentes."
    },
    {
        codigo: "P003",
        nombre: "The Last of Us Part II",
        tipoProducto: "Videojuego",
        plataforma: "PlayStation 4",
        precio: 59.99,
        descuento: true,
        porcentajeDescuento: 15,
        foto: "https://i.ytimg.com/vi_webp/eOiUtRF8k28/maxresdefault.webp",
        combo: false,
        descripcion: "The Last of Us Part II es una secuela aclamada que sigue la historia de Ellie en un mundo post-apocalíptico. Con una narrativa profunda y emocional, el juego explora temas de venganza y redención mientras los jugadores enfrentan decisiones difíciles."
    },
    {
        codigo: "P004",
        nombre: "Halo Infinite",
        tipoProducto: "Videojuego",
        plataforma: "Xbox Series X/S",
        precio: 59.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://m.media-amazon.com/images/I/81GYn0fJehL._SL1500_.jpg",
        combo: false,
        descripcion: "Halo Infinite es la última entrega de la icónica saga de disparos en primera persona. Los jugadores asumen el papel del Jefe Maestro en una nueva aventura épica, enfrentándose a enemigos conocidos y nuevos en un vasto mundo abierto."
    },
    {
        codigo: "P005",
        nombre: "Xbox Series X",
        tipoProducto: "Consola",
        plataforma: "Xbox Series X",
        precio: 499.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFRrbQ9WDJ6hiIreMaoOfVVLfR6gzKlr5bw&s",
        combo: true,
        descripcion: "La Xbox Series X es la consola más potente de Microsoft, diseñada para ofrecer un rendimiento excepcional y gráficos de última generación. Con una amplia gama de juegos y compatibilidad con versiones anteriores, es la elección perfecta para los jugadores serios."
    },
    {
        codigo: "P006",
        nombre: "Nintendo Switch OLED",
        tipoProducto: "Consola",
        plataforma: "Nintendo Switch",
        precio: 349.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxybOfMl4LXIEXkNqR8efIfjmTTHlGCRDrw&s",
        combo: true,
        descripcion: "La Nintendo Switch OLED es una versión mejorada de la popular consola híbrida, ofreciendo una pantalla más grande y vibrante. Con la capacidad de jugar en casa o en movimiento, es ideal para los amantes de los juegos de Nintendo."
    },
    {
        codigo: "P007",
        nombre: "Elden Ring",
        tipoProducto: "Videojuego",
        plataforma: "PC",
        precio: 59.99,
        descuento: true,
        porcentajeDescuento: 10,
        foto: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
        combo: false,
        descripcion: "Elden Ring es un emocionante videojuego de rol de acción que te lleva a un mundo de fantasía. Con una historia profunda y un mundo abierto lleno de misiones y desafíos, es un juego que te mantendrá enganchado durante horas."
    },
    {
        codigo: "P008",
        nombre: "Animal Crossing: New Horizons",
        tipoProducto: "Videojuego",
        plataforma: "Nintendo Switch",
        precio: 59.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a",
        combo: false,
        descripcion: "Animal Crossing: New Horizons es un videojuego de simulación de vida que te permite construir y personalizar tu propia isla. Con una variedad de actividades y personajes adorables, es un juego perfecto para relajarte y disfrutar."
    },
    {
        codigo: "P009",
        nombre: "NVIDIA GeForce RTX 3070",
        tipoProducto: "Componente",
        plataforma: "Computadoras",
        precio: 499.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://static.gigabyte.com/StaticFile/Image/Global/cc307cf8fe9c82330869634a3539db5b/Product/26313",
        combo: false,
        descripcion: "La NVIDIA GeForce RTX 3070 es una tarjeta gráfica de alta gama que ofrece un rendimiento gráfico excepcional y características innovadoras. Ideal para los gamers y profesionales que requieren un rendimiento óptimo."
    },
    {
        codigo: "P010",
        nombre: "Logitech G502 HERO",
        tipoProducto: "Accesorio",
        plataforma: "Computadoras",
        precio: 49.99,
        descuento: true,
        porcentajeDescuento: 10,
        foto: "https://sologamerbolivia.com/cdn/shop/products/g502.png?v=1651763088",
        combo: false,
        descripcion: "El Logitech G502 HERO es un mouse gaming de alta calidad que ofrece una precisión y velocidad excepcionales. Con una ergonomía cómoda y botones personalizables, es perfecto para los gamers que buscan mejorar su experiencia de juego."
    },
    {
        codigo: "P011",
        nombre: "Razer BlackWidow Lite",
        tipoProducto: "Accesorio",
        plataforma: "Computadoras",
        precio: 99.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://cellplay.com.ar/img/Public/producto-95890398-0.jpg",
        combo: false,
        descripcion: "El Razer BlackWidow Lite es un teclado gaming de alta calidad que ofrece una velocidad y precisión excepcionales. Con una iluminación personalizable y botones táctiles, es perfecto para los gamers que buscan mejorar su experiencia de juego."
    },
    {
        codigo: "P012",
        nombre: "Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
        tipoProducto: "Componente",
        plataforma: "Computadoras",
        precio: 69.99,
        descuento: true,
        porcentajeDescuento: 15,
        foto: "https://m.media-amazon.com/images/I/61wCOVcyvFL._AC_UF894,1000_QL80_.jpg",
        combo: false,
        descripcion: "La memoria RAM Corsair Vengeance LPX 16GB es una excelente opción para mejorar el rendimiento de tu computadora. Con una velocidad de 3200MHz y una capacidad de 16GB, es perfecta para los usuarios que requieren un rendimiento óptimo."
    },
    {
        codigo: "P013",
        nombre: "Western Digital Black SN750 NVMe SSD 1TB",
        tipoProducto: "Componente",
        plataforma: "Computadoras",
        precio:  129.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStWaKswzWaBLMcZzSLrF4YJ2z8dmtejQ5bPw&s",
        combo: false,
        descripcion: "El Western Digital Black SN750 NVMe SSD 1TB es un disco duro de estado sólido de alta velocidad que ofrece un rendimiento excepcional. Con una capacidad de 1TB y una velocidad de lectura de hasta 3500MB/s, es perfecto para los usuarios que requieren un almacenamiento rápido y seguro."
    },
    {
        codigo: "P014",
        nombre: "HyperX Cloud II",
        tipoProducto: "Accesorio",
        plataforma: "Computadoras",
        precio: 99.99,
        descuento: true,
        porcentajeDescuento: 10,
        foto: "https://matecsbol.com/cdn/shop/products/61JJl260NlL._AC_SL1412_1000x.jpg?v=1632759583",
        combo: false,
        descripcion: "El HyperX Cloud II es un auricular gaming de alta calidad que ofrece un sonido excepcional y una comodidad óptima. Con una conexión inalámbrica y un micrófono de alta calidad, es perfecto para los gamers que buscan una experiencia de juego inmersiva."
    },
    {
        codigo: "P015",
        nombre: "ASUS PRIME Z590-A",
        tipoProducto: "Componente",
        plataforma: "Computadoras",
        precio: 299.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJwSs0PO1KewX0yZVod8ufwjmN4DSMe9dRQ&s",
        combo: false,
        descripcion: "La placa base ASUS PRIME Z590-A es una excelente opción para los usuarios que buscan una plataforma estable y potente. Con características innovadoras y una calidad de construcción excepcional, es perfecta para los gamers y profesionales que requieren un rendimiento óptimo."
    },
    {
        codigo: "P016",
        nombre: "Corsair Hydro Series H115i RGB Platinum",
        tipoProducto: "Componente",
        plataforma: "Computadoras",
        precio: 139.99,
        descuento: true,
        porcentajeDescuento: 15,
        foto: "https://m.media-amazon.com/images/I/61bLmUADgoS._AC_UF894,1000_QL80_.jpg",
        combo: false,
        descripcion: "El Corsair Hydro Series H115i RGB Platinum es un sistema de refrigeración líquida de alta calidad que ofrece un rendimiento excepcional y una iluminación personalizable. Con una capacidad de enfriamiento óptima y una instalación sencilla, es perfecto para los usuarios que requieren un rendimiento óptimo y un diseño atractivo."
    },
    {
        codigo: "P017",
        nombre: "SteelSeries Rival 600",
        tipoProducto: "Accesorio",
        plataforma: "Computadoras",
        precio: 79.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://m.media-amazon.com/images/I/61zSpZSQ9LL._AC_SL1500_.jpg",
        combo: false,
        descripcion: "El SteelSeries Rival 600 es un mouse gaming de alta calidad que ofrece una precisión y velocidad excepcionales. Con una ergonomía cómoda y botones personalizables, es perfecto para los gamers que buscan mejorar su experiencia de juego."
    },
    {
        codigo: "P018",
        nombre: "Ghost of Tsushima",
        tipoProducto: "Videojuego",
        plataforma: "PlayStation 4",
        precio: 49.99,
        descuento: true,
        porcentajeDescuento: 10,
        foto: "https://gmedia.playstation.com/is/image/SIEPDC/ghost-of-tsushima-directors-cut-homepage-hero-listing-thumb-01-ps5-09jun21$en?$facebook$",
        combo: false,
        descripcion: "Ghost of Tsushima es un emocionante videojuego de acción y aventuras que te lleva a la isla de Tsushima en el siglo XIII. Con una historia emocionante y un sistema de combate innovador, es un juego que te mantendrá enganchado durante horas."
    },
    {
        codigo: "P019",
        nombre: "Gigabyte AORUS GeForce RTX 3080 XTREME",
        tipoProducto: "Componente",
        plataforma: "Computadoras",
        precio: 1399.99,
        descuento: false,
        porcentajeDescuento: 0,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUTCB6aPv3eiug4t9HTQS0wpn6-i0hawpW0w&s",
        combo: false,
        descripcion: "La Gigabyte AORUS GeForce RTX 3080 XTREME es una tarjeta gráfica de alta gama que ofrece un rendimiento gráfico excepcional y características innovadoras. Con una velocidad de reloj de hasta 1.71GHz y 12GB de memoria GDDR6X, es perfecta para los gamers y profesionales que requieren un rendimiento óptimo."
    },
    {
        codigo: "P020",
        nombre: "Corsair Obsidian Series 7700",
        tipoProducto: "Componente",
        plataforma: "Computadoras",
        precio: 299.99,
        descuento: true,
        porcentajeDescuento: 10,
        foto: "https://assets.corsair.com/image/upload/f_auto,q_auto/content/cc-9011148-ww-1000d-hero.png",
        combo: false,
        descripcion: "El Corsair Obsidian Series 7700 es un gabinete de alta calidad que ofrece un diseño atractivo y una construcción robusta. Con características innovadoras y una capacidad de expansión óptima, es perfecto para los usuarios que buscan un gabinete que combine estilo y funcionalidad."
    }
];

// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Buscar el producto en el array de productos
const producto = productos.find(p => p.codigo === productId);

// Mostrar los detalles del producto
if (producto) {

    document.title = producto.nombre;
    document.getElementById('header-title').textContent = producto.nombre;

    const originalPrice = producto.descuento ? (producto.precio / (1 - (producto.porcentajeDescuento / 100))).toFixed(2) : producto.precio;

    document.getElementById('product-details').innerHTML = `
        <div class="product-container">
            <img src="${producto.foto}" alt="${producto.nombre}" id="product-image">
            <div class="product-info">
                <h2 id="product-title">${producto.nombre}</h2>
                <p class="price">Precio: $<span id="discounted-price">${producto.precio.toFixed(2)}</span></p>
                ${producto.descuento ? `<p class="original-price">Precio Original: $<span>${originalPrice}</span></p>` : ''}
                <button id="comprar">Comprar</button>
                <button id="carrito">Agregar al Carrito</button>
            </div>
        </div>
        <hr>
        <p class="description" id="product-description">${producto.descripcion}</p>
        <p class="platform" id="product-platform">Plataforma: <span>${producto.plataforma}</span></p>
    `;

    // Agregar eventos a los botones
    document.getElementById('comprar').addEventListener('click', showError);
    document.getElementById('carrito').addEventListener('click', showError);
} else {
    document.getElementById('product-details').innerHTML = '<p>Producto no encontrado.</p>';
}

// Función para mostrar el mensaje de error
function showError() {
    alert("Error: Debes iniciar sesión para realizar una compra o agregar productos al carrito.");
}