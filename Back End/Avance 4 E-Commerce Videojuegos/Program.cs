using System;
using System.Collections.Generic;

// Clase Usuario
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Correo { get; set; }
    public string Celular { get; set; }
    public string Direccion { get; set; }
    public int Edad { get; set; }

    public Usuario(int id, string nombre, string correo, string celular, string direccion, int edad)
    {
        Id = id;
        Nombre = nombre;
        Correo = correo;
        Celular = celular;
        Direccion = direccion;
        Edad = edad;
    }
}

// Clase Producto
public class Producto
{
    public int Codigo { get; set; }
    public string Nombre { get; set; }
    public string TipoProducto { get; set; }
    public string Plataforma { get; set; }
    public decimal Precio { get; set; }
    public bool TieneDescuento { get; set; }
    public int PorcentajeDescuento { get; set; }
    public string Foto { get; set; }
    public bool VieneEnCombo { get; set; }
    public string Descripcion { get; set; }

    public Producto(int codigo, string nombre, string tipoProducto, string plataforma, decimal precio,
                    bool tieneDescuento, int porcentajeDescuento, string foto, bool vieneEnCombo, string descripcion)
    {
        Codigo = codigo;
        Nombre = nombre;
        TipoProducto = tipoProducto;
        Plataforma = plataforma;
        Precio = precio;
        TieneDescuento = tieneDescuento;
        PorcentajeDescuento = porcentajeDescuento;
        Foto = foto;
        VieneEnCombo = vieneEnCombo;
        Descripcion = descripcion;
    }

    public decimal ObtenerPrecioConDescuento()
    {
        return TieneDescuento ? Precio * (1 - PorcentajeDescuento / 100) : Precio;
    }
}

// Clase DetallePedido
public class DetallePedido
{
    public Producto Producto { get; set; }
    public int Cantidad { get; set; }
    public decimal PrecioUnitario => Producto.ObtenerPrecioConDescuento();
    public decimal Total => PrecioUnitario * Cantidad;

    public DetallePedido(Producto producto, int cantidad)
    {
        Producto = producto;
        Cantidad = cantidad;
    }
}

// Clase Pedido
public class Pedido
{
    public int Id { get; set; }
    public Usuario Cliente { get; set; }
    public DateTime FechaPedido { get; set; }
    public List<DetallePedido> Detalles { get; set; } = new List<DetallePedido>();
    public decimal PrecioTotal => CalcularPrecioTotal();
    public string Nit { get; set; }

    public Pedido(int id, Usuario cliente, string nit)
    {
        Id = id;
        Cliente = cliente;
        FechaPedido = DateTime.Now;
        Nit = nit;
    }

    public void AgregarDetalle(Producto producto, int cantidad)
    {
        Detalles.Add(new DetallePedido(producto, cantidad));
    }

    private decimal CalcularPrecioTotal()
    {
        decimal total = 0;
        foreach (var detalle in Detalles)
        {
            total += detalle.Total;
        }
        return total;
    }
}

class Program
{
    static void Main()
    {
        var usuarios = new List<Usuario>
        {
            new Usuario(1, "Juan Perez", "juan.perez@example.com", "12345678", "123 Calle Falsa", 30),
            new Usuario(2, "Maria Gomez", "maria.gomez@example.com", "87654321", "456 Calle Real", 25)
        };

        // Crear algunos productos
        var productos = new List<Producto> {
            new Producto(1, "Dragon Ball Sparking Zero", "Videojuego", "PlayStation 5", 70.00m, true, 10, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QQ7kP7Ve2ROtum6yLZR6XlnlaIyWuIe0Qw&s", false, "Dragon Ball Sparking Zero es un videojuego de lucha que permite a los jugadores experimentar combates épicos con sus personajes favoritos de la serie. Con gráficos impresionantes y un sistema de combate dinámico, revive las batallas más emocionantes del universo Dragon Ball."),
            new Producto(2, "PlayStation 5", "Consola", "PlayStation 5", 500.00m, false, 0, "https://atlas-content-cdn.pixelsquid.com/assets_v2/245/2452423176773178782/jpeg-600/G03.jpg?modifiedAt=1", true, "La PlayStation 5 es la consola de videojuegos de última generación de Sony, ofreciendo un rendimiento gráfico excepcional y tiempos de carga ultrarrápidos. Con una amplia biblioteca de juegos y características innovadoras, es perfecta para los gamers más exigentes."),
            new Producto(3, "The Last of Us Part II", "Videojuego", "PlayStation 4", 59.99m, true, 15, "https://i.ytimg.com/vi_webp/eOiUtRF8k28/maxresdefault.webp", false, "The Last of Us Part II es una secuela aclamada que sigue la historia de Ellie en un mundo post-apocalíptico. Con una narrativa profunda y emocional, el juego explora temas de venganza y redención mientras los jugadores enfrentan decisiones difíciles."),
            new Producto(4, "Halo Infinite", "Videojuego", "Xbox Series X/S", 59.99m, false, 0, "https://m.media-amazon.com/images/I/81GYn0fJehL._SL1500_.jpg", false, "Halo Infinite es la última entrega de la icónica saga de disparos en primera persona. Los jugadores asumen el papel del Jefe Maestro en una nueva aventura épica, enfrentándose a enemigos conocidos y nuevos en un vasto mundo abierto."),
            new Producto(5, "Xbox Series X", "Consola", "Xbox Series X", 499.99m, false, 0, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFRrbQ9WDJ6hiIreMaoOfVVLfR6gzKlr5bw&s", true, "La Xbox Series X es la consola más potente de Microsoft, diseñada para ofrecer un rendimiento excepcional y gráficos de última generación. Con una amplia gama de juegos y compatibilidad con versiones anteriores, es la elección perfecta para los jugadores serios."),
            new Producto(6, "Nintendo Switch OLED", "Consola", "Nintendo Switch", 349.99m, false, 0, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxybOfMl4LXIEXkNqR8efIfjmTTHlGCRDrw&s", true, "La Nintendo Switch OLED es una versión mejorada de la popular consola híbrida, ofreciendo una pantalla más grande y vibrante. Con la capacidad de jugar en casa o en movimiento, es ideal para los amantes de los juegos de Nintendo."),
            new Producto(7, "Elden Ring", "Videojuego", "PC", 59.99m, true, 10, "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png", false, "Elden Ring es un emocionante videojuego de rol de acción que te lleva a un mundo de fantasía. Con una historia profunda y un mundo abierto lleno de misiones y desafíos, es un juego que te mantendrá enganchado durante horas."),
            new Producto(8, "Animal Crossing: New Horizons", "Videojuego", "Nintendo Switch", 59.99m, false, 0, "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000027619/9989957e ae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a", false, "Animal Crossing: New Horizons es un videojuego de simulación de vida que te permite construir y personalizar tu propia isla. Con una variedad de actividades y personajes adorables, es un juego perfecto para relajarte y disfrutar."),
            new Producto(9, "NVIDIA GeForce RTX 3070", "Componente", "Computadoras", 499.99m, false, 0, "https://static.gigabyte.com/StaticFile/Image/Global/cc307cf8fe9c82330869634a3539db5b/Product/26313", false, "La NVIDIA GeForce RTX 3070 es una tarjeta gráfica de alta gama que ofrece un rendimiento gráfico excepcional y características innovadoras. Ideal para los gamers y profesionales que requieren un rendimiento óptimo."),
            new Producto(10, "Logitech G502 HERO", "Accesorio", "Computadoras", 49.99m, true, 10, "https://sologamerbolivia.com/cdn/shop/products/g502.png?v=1651763088", false, "El Logitech G502 HERO es un mouse gaming de alta calidad que ofrece una precisión y velocidad excepcionales. Con una ergonomía cómoda y botones personalizables, es perfecto para los gamers que buscan mejorar su experiencia de juego."),
        };

        // Mostrar la lista de usuarios
        Console.WriteLine("Seleccione un cliente:");
        for (int i = 0; i < usuarios.Count; i++)
        {
            Console.WriteLine($"{i + 1}. {usuarios[i].Nombre}");
        }

        int clienteSeleccionado = Convert.ToInt32(Console.ReadLine()) - 1;

        // Crear un pedido para el cliente seleccionado
        var pedido = new Pedido(1, usuarios[clienteSeleccionado], "12345678");

        // Agregar productos al pedido
        while (true)
        {
            // Mostrar la lista de productos
            Console.WriteLine("Seleccione un producto para agregar al pedido:");
            for (int i = 0; i < productos.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {productos[i].Nombre} - Precio: ${productos[i].Precio}");
            }
            Console.WriteLine("0. Finalizar pedido");

            int productoSeleccionado = Convert.ToInt32(Console.ReadLine());

            if (productoSeleccionado == 0)
                break;

            Console.WriteLine("Ingrese la cantidad:");
            int cantidad = Convert.ToInt32(Console.ReadLine());

            pedido.AgregarDetalle(productos[productoSeleccionado - 1], cantidad);
        }

        // Confirmar el pedido
        Console.WriteLine("¿Desea confirmar el pedido? (s/n)");
        string confirmar = Console.ReadLine();

        if (confirmar.ToLower() == "s")
        {
            Console.WriteLine("Ingrese el NIT para la factura:");
            pedido.Nit = Console.ReadLine();

            // Mostrar el resumen del pedido
            Console.WriteLine($"Pedido ID: {pedido.Id}");
            Console.WriteLine($"Cliente: {pedido.Cliente.Nombre}");
            Console.WriteLine($"Fecha: {pedido.FechaPedido}");
            Console.WriteLine($"NIT: {pedido.Nit}");
            Console.WriteLine("Detalles del Pedido:");

            foreach (var detalle in pedido.Detalles)
            {
                Console.WriteLine($"- {detalle.Producto.Nombre} x{detalle.Cantidad} - Precio unitario: ${detalle.PrecioUnitario} - Total: ${detalle.Total}");
            }

            Console.WriteLine($"Precio Total del Pedido: ${pedido.PrecioTotal}");
        }
        else
        {
            Console.WriteLine("Pedido cancelado.");
        }
    }
}
