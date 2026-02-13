from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
from datetime import datetime

# Inicializar Flask
app = Flask(__name__)
CORS(app)  # Permite conexiones desde el frontend

# ========== BASE DE DATOS ==========
def inicializar_db():
    """Crea las tablas si no existen"""
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    
    # Tabla de pedidos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_cliente TEXT NOT NULL,
            telefono TEXT NOT NULL,
            correo TEXT,
            talla TEXT NOT NULL,
            pais TEXT,
            ciudad TEXT,
            barrio TEXT,
            direccion TEXT NOT NULL,
            modelo TEXT NOT NULL,
            color_perla TEXT NOT NULL,
            diseno TEXT NOT NULL,
            mensaje TEXT,
            fecha TEXT NOT NULL,
            estado TEXT DEFAULT 'pendiente'
        )
    ''')
    
    # Tabla de modelos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS modelos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL
        )
    ''')
    
    # Tabla de colores de perlas
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS colores_perlas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            color TEXT NOT NULL
        )
    ''')
    
    # Tabla de diseños
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS disenos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT NOT NULL
        )
    ''')
    
    # Insertar datos por defecto si las tablas están vacías
    cursor.execute('SELECT COUNT(*) FROM modelos')
    if cursor.fetchone()[0] == 0:
        modelos_default = [
            ('Air Nike Blancos',),
            ('Converse Venus en Bota Blancos',)
        ]
        cursor.executemany('INSERT INTO modelos (nombre) VALUES (?)', modelos_default)
    
    cursor.execute('SELECT COUNT(*) FROM colores_perlas')
    if cursor.fetchone()[0] == 0:
        colores_default = [
            ('Blanco', '#ffffff'),
            ('Rosa', '#ffb6c1'),
            ('Azul', '#87ceeb'),
            ('Dorado', '#ffd700'),
            ('Plateado', '#c0c0c0')
        ]
        cursor.executemany(
            'INSERT INTO colores_perlas (nombre, color) VALUES (?, ?)', 
            colores_default
        )
    
    cursor.execute('SELECT COUNT(*) FROM disenos')
    if cursor.fetchone()[0] == 0:
        disenos_default = [
            ('Flores', 'Diseño floral delicado'),
            ('Estrellas', 'Estrellas brillantes'),
            ('Corazones', 'Corazones románticos'),
            ('Mariposas', 'Mariposas coloridas')
        ]
        cursor.executemany(
            'INSERT INTO disenos (nombre, descripcion) VALUES (?, ?)', 
            disenos_default
        )
    
    conn.commit()
    conn.close()

# ========== RUTAS DE MODELOS ==========
@app.route('/api/modelos', methods=['GET'])
def obtener_modelos():
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM modelos')
    modelos = [{'id': row[0], 'nombre': row[1]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(modelos)

@app.route('/api/modelos', methods=['POST'])
def agregar_modelo():
    datos = request.json
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO modelos (nombre) VALUES (?)', (datos['nombre'],))
    conn.commit()
    nuevo_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': nuevo_id, 'nombre': datos['nombre']}), 201

@app.route('/api/modelos/<int:id>', methods=['DELETE'])
def eliminar_modelo(id):
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM modelos WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Modelo eliminado'}), 200

# ========== RUTAS DE COLORES ==========
@app.route('/api/colores', methods=['GET'])
def obtener_colores():
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM colores_perlas')
    colores = [{'id': row[0], 'nombre': row[1], 'color': row[2]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(colores)

@app.route('/api/colores', methods=['POST'])
def agregar_color():
    datos = request.json
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO colores_perlas (nombre, color) VALUES (?, ?)', 
        (datos['nombre'], datos['color'])
    )
    conn.commit()
    nuevo_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': nuevo_id, 'nombre': datos['nombre'], 'color': datos['color']}), 201

@app.route('/api/colores/<int:id>', methods=['DELETE'])
def eliminar_color(id):
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM colores_perlas WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Color eliminado'}), 200

# ========== RUTAS DE DISEÑOS ==========
@app.route('/api/disenos', methods=['GET'])
def obtener_disenos():
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM disenos')
    disenos = [{'id': row[0], 'nombre': row[1], 'descripcion': row[2]} for row in cursor.fetchall()]
    conn.close()
    return jsonify(disenos)

@app.route('/api/disenos', methods=['POST'])
def agregar_diseno():
    datos = request.json
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO disenos (nombre, descripcion) VALUES (?, ?)', 
        (datos['nombre'], datos['descripcion'])
    )
    conn.commit()
    nuevo_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': nuevo_id, 'nombre': datos['nombre'], 'descripcion': datos['descripcion']}), 201

@app.route('/api/disenos/<int:id>', methods=['DELETE'])
def eliminar_diseno(id):
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM disenos WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Diseño eliminado'}), 200

# ========== RUTAS DE PEDIDOS ==========
@app.route('/api/pedidos', methods=['GET'])
def obtener_pedidos():
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM pedidos ORDER BY fecha DESC')
    pedidos = [{
        'id': row[0],
        'nombre_cliente': row[1],
        'telefono': row[2],
        'modelo': row[3],
        'color_perla': row[4],
        'diseno': row[5],
        'mensaje': row[6],
        'fecha': row[7],
        'estado': row[8]
    } for row in cursor.fetchall()]
    conn.close()
    return jsonify(pedidos)

@app.route('/api/pedidos', methods=['POST'])
def crear_pedido():
    datos = request.json
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO pedidos 
        (nombre_cliente, telefono, correo, talla, pais, ciudad, barrio, direccion, modelo, color_perla, diseno, mensaje, fecha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        datos['nombre_cliente'],
        datos['telefono'],
        datos.get('correo', ''),
        datos['talla'],
        datos.get('pais', ''),
        datos.get('ciudad', ''),
        datos.get('barrio', ''),
        datos['direccion'],
        datos['modelo'],
        datos['color_perla'],
        datos['diseno'],
        datos.get('mensaje', ''),
        fecha
    ))
    conn.commit()
    nuevo_id = cursor.lastrowid
    conn.close()
    return jsonify({'id': nuevo_id, 'mensaje': 'Pedido creado exitosamente'}), 201

@app.route('/api/pedidos/<int:id>/estado', methods=['PUT'])
def actualizar_estado(id):
    datos = request.json
    conn = sqlite3.connect('backend/krystal_style.db')
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE pedidos SET estado = ? WHERE id = ?', 
        (datos['estado'], id)
    )
    conn.commit()
    conn.close()
    return jsonify({'mensaje': 'Estado actualizado'}), 200

# ========== INICIAR SERVIDOR ==========
if __name__ == '__main__':
    inicializar_db()
    print("✅ Base de datos inicializada")
    print("🚀 Servidor corriendo en http://localhost:5000")
    app.run(debug=True, port=5000)