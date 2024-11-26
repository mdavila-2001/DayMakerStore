import urllib

class Config:
    SQLALCHEMY_DATABASE_URI = (
        "mssql+pyodbc:///?odbc_connect=" +
        urllib.parse.quote_plus(
            "Driver={ODBC Driver 17 for SQL Server};"
            "Server=DESKTOP-19GP3N0\\SQLEXPRESS;"
            "Database=Final_ECommerce;"
            "Trusted_Connection=yes;"
        )
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False