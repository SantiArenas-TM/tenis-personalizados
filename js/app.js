// Cargar datos del localStorage o usar datos por defecto
let modelosTenis = JSON.parse(localStorage.getItem('modelosTenis')) || [
    { id: 1, nombre: "Air Nike Blancos" },
    { id: 2, nombre: "Vans en Bota Blancos" }
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

// Variables para guardar la selección del usuario
let seleccion = {
    modelo: null,
    colorPerla: null,
    diseno: null
};

// Función para inicializar la página
function inicializar() {
    cargarModelos();
    cargarColoresPerlas();
    cargarDisenos();
}

// Cargar los modelos de tenis
function cargarModelos() {
    const contenedor = document.querySelector('.selector-modelo');
    const divOpciones = document.createElement('div');
    divOpciones.className = 'opciones-grid';
    
    modelosTenis.forEach(modelo => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-opcion';
        tarjeta.innerHTML = `
            <h4>${modelo.nombre}</h4>
            <button onclick="seleccionarModelo(${modelo.id})">Seleccionar</button>
        `;
        divOpciones.appendChild(tarjeta);
    });
    
    contenedor.appendChild(divOpciones);
}

// Cargar colores de perlas
function cargarColoresPerlas() {
    const contenedor = document.querySelector('.selector-perlas');
    const divOpciones = document.createElement('div');
    divOpciones.className = 'opciones-grid';
    
    coloresPerlas.forEach(perla => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-opcion';
        tarjeta.innerHTML = `
            <div class="muestra-color" style="background-color: ${perla.color}; border: 2px solid #ddd;"></div>
            <h4>${perla.nombre}</h4>
            <button onclick="seleccionarPerla(${perla.id})">Seleccionar</button>
        `;
        divOpciones.appendChild(tarjeta);
    });
    
    contenedor.appendChild(divOpciones);
}

// Cargar diseños
function cargarDisenos() {
    const contenedor = document.querySelector('.selector-disenos');
    const divOpciones = document.createElement('div');
    divOpciones.className = 'opciones-grid';
    
    disenosDisponibles.forEach(diseno => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-opcion';
        tarjeta.innerHTML = `
            <h4>${diseno.nombre}</h4>
            <p>${diseno.descripcion}</p>
            <button onclick="seleccionarDiseno(${diseno.id})">Seleccionar</button>
        `;
        divOpciones.appendChild(tarjeta);
    });
    
    contenedor.appendChild(divOpciones);
}

// Funciones de selección
// Funciones de selección
function seleccionarModelo(id) {
    seleccion.modelo = modelosTenis.find(m => m.id === id);
    document.getElementById('resumen-modelo').textContent = seleccion.modelo.nombre;
    actualizarBotonPedido();
}

function seleccionarPerla(id) {
    seleccion.colorPerla = coloresPerlas.find(c => c.id === id);
    document.getElementById('resumen-perla').textContent = seleccion.colorPerla.nombre;
    actualizarBotonPedido();
}

function seleccionarDiseno(id) {
    seleccion.diseno = disenosDisponibles.find(d => d.id === id);
    document.getElementById('resumen-diseno').textContent = seleccion.diseno.nombre;
    actualizarBotonPedido();
}

// Actualizar estado del botón de pedido
function actualizarBotonPedido() {
    const boton = document.getElementById('btn-enviar-pedido');
    if (seleccion.modelo && seleccion.colorPerla && seleccion.diseno) {
        boton.disabled = false;
    } else {
        boton.disabled = true;
    }
}

// Enviar pedido
function enviarPedido() {
    alert(`¡Pedido enviado!\n\nModelo: ${seleccion.modelo.nombre}\nPerlas: ${seleccion.colorPerla.nombre}\nDiseño: ${seleccion.diseno.nombre}\n\n¡Pronto nos contactaremos contigo!`);
}

// Mostrar resumen de selección
function mostrarResumen() {
    console.log("Selección actual:", seleccion);
}

// Iniciar cuando la página cargue
window.addEventListener('DOMContentLoaded', inicializar);