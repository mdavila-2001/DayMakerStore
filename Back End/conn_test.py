import pyodbc

# Configura tu string de conexión
conn_str = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=DESKTOP-19GP3N0\\SQLEXPRESS;"
    "Database=ProyectoFinal;"
    "Trusted_Connection=yes;"
)

# Establece la conexión
try:
    conn = pyodbc.connect(conn_str)
    print("Conexión exitosa!")
    
    # Ejemplo de ejecución de una consulta
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Producto;")
    for row in cursor.fetchall():
        print(row)
    
    # Cierra la conexión
    cursor.close()
    conn.close()
except Exception as e:
    print("Ocurrió un error:", e)
