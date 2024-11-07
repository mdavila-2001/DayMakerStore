from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import urllib

app = Flask(__name__)

# Configurar la cadena de conexión
params = urllib.parse.quote_plus("Driver={ODBC Driver 17 for SQL Server};"
                                 "Server=DESKTOP-19GP3N0\\SQLEXPRESS;"
                                 "Database=ProyectoFinal;"
                                 "Trusted_Connection=yes;")

app.config['SQLALCHEMY_DATABASE_URI'] = "mssql+pyodbc:///?odbc_connect=%s" % params
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Ruta de prueba
@app.route('/')
def home():
    return jsonify({"mensaje": "API funcionando!"})

if __name__ == '__main__':
    app.run(debug=True)