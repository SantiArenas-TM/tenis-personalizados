// Cargar datos del localStorage o usar datos por defecto
let modelosTenis = JSON.parse(localStorage.getItem('modelosTenis')) || [
    { id: 1, nombre: "Air Nike Blancos" },
    { id: 2, nombre: "Converse Venus en Bota Blancos" }
];

let coloresPerlas = JSON.parse(localStorage.getItem('coloresPerlas')) || [
    { id: 1, nombre: "Blanco", color: "#ffffff" },
    { id: 2, nombre: "Rosa", color: "#ffb6c1" },
    { id: 3, nombre: "Azul", color: "#87ceeb" },
    { id: 4, nombre: "Dorado", color: "#ffd700" },
    { id: 5, nombre: "Plateado", color: "#c0c0c0" }
];

let disenosDisponibles = JSON.parse(localStorage.getItem('disenosDisponibles')) || [
    { id: 1, nombre: "Flores", descripcion: "Diseño floral delicado" },
    { id: 2, nombre: "Estrellas", descripcion: "Estrellas brillantes" },
    { id: 3, nombre: "Corazones", descripcion: "Corazones románticos" },
    { id: 4, nombre: "Mariposas", descripcion: "Mariposas coloridas" }
];

// Función para generar ID único
function generarId(array) {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}

// Guardar en localStorage
function guardarDatos() {
    localStorage.setItem('modelosTenis', JSON.stringify(modelosTenis));
    localStorage.setItem('coloresPerlas', JSON.stringify(coloresPerlas));
    localStorage.setItem('disenosDisponibles', JSON.stringify(disenosDisponibles));
}

// ========== MODELOS ==========
function agregarModelo() {
    const input = document.getElementById('nuevo-modelo');
    const nombre = input.value.trim();
    
    if (nombre === '') {
        alert('Por favor ingresa un nombre para el modelo');
        return;
    }
    
    const nuevoModelo = {
        id: generarId(modelosTenis),
        nombre: nombre
    };
    
    modelosTenis.push(nuevoModelo);
    guardarDatos();
    input.value = '';
    mostrarModelos();
    alert('✅ Modelo agregado exitosamente');
}

function eliminarModelo(id) {
    if (confirm('¿Estás seguro de eliminar este modelo?')) {
        modelosTenis = modelosTenis.filter(m => m.id !== id);
        guardarDatos();
        mostrarModelos();
        alert('🗑️ Modelo eliminado');
    }
}

function mostrarModelos() {
    const lista = document.getElementById('lista-modelos');
    lista.innerHTML = '';
    
    modelosTenis.forEach(modelo => {
        const div = document.createElement('div');
        div.className = 'item-lista';
        div.innerHTML = `
            <span><strong>${modelo.nombre}</strong></span>
            <button class="btn-admin btn-eliminar" onclick="eliminarModelo(${modelo.id})">🗑️ Eliminar</button>
        `;
        lista.appendChild(div);
    });
}

// ========== COLORES ==========
function agregarColorPerla() {
    const inputNombre = document.getElementById('nuevo-color-nombre');
    const inputCodigo = document.getElementById('nuevo-color-codigo');
    const nombre = inputNombre.value.trim();
    const color = inputCodigo.value;
    
    if (nombre === '') {
        alert('Por favor ingresa un nombre para el color');
        return;
    }
    
    const nuevoColor = {
        id: generarId(coloresPerlas),
        nombre: nombre,
        color: color
    };
    
    coloresPerlas.push(nuevoColor);
    guardarDatos();
    inputNombre.value = '';
    inputCodigo.value = '#00ff00';
    mostrarColores();
    alert('✅ Color agregado exitosamente');
}

function eliminarColor(id) {
    if (confirm('¿Estás seguro de eliminar este color?')) {
        coloresPerlas = coloresPerlas.filter(c => c.id !== id);
        guardarDatos();
        mostrarColores();
        alert('🗑️ Color eliminado');
    }
}

function mostrarColores() {
    const lista = document.getElementById('lista-colores');
    lista.innerHTML = '';
    
    coloresPerlas.forEach(perla => {
        const div = document.createElement('div');
        div.className = 'item-lista';
        div.innerHTML = `
            <span>
                <div style="display: inline-block; width: 30px; height: 30px; background: ${perla.color}; border: 2px solid #ddd; border-radius: 50%; vertical-align: middle; margin-right: 10px;"></div>
                <strong>${perla.nombre}</strong> (${perla.color})
            </span>
            <button class="btn-admin btn-eliminar" onclick="eliminarColor(${perla.id})">🗑️ Eliminar</button>
        `;
        lista.appendChild(div);
    });
}

// ========== DISEÑOS ==========
function agregarDiseno() {
    const inputNombre = document.getElementById('nuevo-diseno-nombre');
    const inputDesc = document.getElementById('nuevo-diseno-desc');
    const nombre = inputNombre.value.trim();
    const descripcion = inputDesc.value.trim();
    
    if (nombre === '' || descripcion === '') {
        alert('Por favor completa todos los campos');
        return;
    }
    
    const nuevoDiseno = {
        id: generarId(disenosDisponibles),
        nombre: nombre,
        descripcion: descripcion
    };
    
    disenosDisponibles.push(nuevoDiseno);
    guardarDatos();
    inputNombre.value = '';
    inputDesc.value = '';
    mostrarDisenos();
    alert('✅ Diseño agregado exitosamente');
}

function eliminarDiseno(id) {
    if (confirm('¿Estás seguro de eliminar este diseño?')) {
        disenosDisponibles = disenosDisponibles.filter(d => d.id !== id);
        guardarDatos();
        mostrarDisenos();
        alert('🗑️ Diseño eliminado');
    }
}

function mostrarDisenos() {
    const lista = document.getElementById('lista-disenos');
    lista.innerHTML = '';
    
    disenosDisponibles.forEach(diseno => {
        const div = document.createElement('div');
        div.className = 'item-lista';
        div.innerHTML = `
            <span><strong>${diseno.nombre}</strong> - ${diseno.descripcion}</span>
            <button class="btn-admin btn-eliminar" onclick="eliminarDiseno(${diseno.id})">🗑️ Eliminar</button>
        `;
        lista.appendChild(div);
    });
}

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    mostrarModelos();
    mostrarColores();
    mostrarDisenos();
});