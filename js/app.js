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

// Funciones de selección con animaciones y vista previa
function seleccionarModelo(id) {
    // Remover selección anterior
    document.querySelectorAll('.selector-modelo .tarjeta-opcion').forEach(tarjeta => {
        tarjeta.classList.remove('seleccionada');
    });
    
    // Agregar animación y selección
    const tarjetas = document.querySelectorAll('.selector-modelo .tarjeta-opcion');
    const tarjetaSeleccionada = tarjetas[id - 1];
    tarjetaSeleccionada.classList.add('clicked');
    setTimeout(() => {
        tarjetaSeleccionada.classList.remove('clicked');
        tarjetaSeleccionada.classList.add('seleccionada');
    }, 150);
    
    seleccion.modelo = modelosTenis.find(m => m.id === id);
    document.getElementById('resumen-modelo').textContent = seleccion.modelo.nombre;
    
    // Actualizar vista previa
    actualizarVistaPrevia();
    actualizarBotonPedido();
}

function seleccionarPerla(id) {
    // Remover selección anterior
    document.querySelectorAll('.selector-perlas .tarjeta-opcion').forEach(tarjeta => {
        tarjeta.classList.remove('seleccionada');
    });
    
    // Agregar animación y selección
    const index = coloresPerlas.findIndex(c => c.id === id);
    const tarjetas = document.querySelectorAll('.selector-perlas .tarjeta-opcion');
    const tarjetaSeleccionada = tarjetas[index];
    tarjetaSeleccionada.classList.add('clicked');
    setTimeout(() => {
        tarjetaSeleccionada.classList.remove('clicked');
        tarjetaSeleccionada.classList.add('seleccionada');
    }, 150);
    
    seleccion.colorPerla = coloresPerlas.find(c => c.id === id);
    document.getElementById('resumen-perla').textContent = seleccion.colorPerla.nombre;
    
    // Actualizar vista previa
    actualizarVistaPrevia();
    actualizarBotonPedido();
}

function seleccionarDiseno(id) {
    // Remover selección anterior
    document.querySelectorAll('.selector-disenos .tarjeta-opcion').forEach(tarjeta => {
        tarjeta.classList.remove('seleccionada');
    });
    
    // Agregar animación y selección
    const index = disenosDisponibles.findIndex(d => d.id === id);
    const tarjetas = document.querySelectorAll('.selector-disenos .tarjeta-opcion');
    const tarjetaSeleccionada = tarjetas[index];
    tarjetaSeleccionada.classList.add('clicked');
    setTimeout(() => {
        tarjetaSeleccionada.classList.remove('clicked');
        tarjetaSeleccionada.classList.add('seleccionada');
    }, 150);
    
    seleccion.diseno = disenosDisponibles.find(d => d.id === id);
    document.getElementById('resumen-diseno').textContent = seleccion.diseno.nombre;
    
    // Actualizar vista previa
    actualizarVistaPrevia();
    actualizarBotonPedido();
}

// Función para actualizar la vista previa
function actualizarVistaPrevia() {
    const previewModelo = document.getElementById('preview-modelo');
    const previewPerlas = document.getElementById('preview-perlas');
    const previewDiseno = document.getElementById('preview-diseno');
    
    // Actualizar modelo
    if (seleccion.modelo) {
        previewModelo.innerHTML = '';
        const clase = seleccion.modelo.nombre.toLowerCase().includes('nike') ? 'nike' : 'vans';
        previewModelo.className = `tenis-modelo ${clase}`;
        document.getElementById('info-modelo').textContent = seleccion.modelo.nombre;
    }
    
    // Actualizar perlas
    if (seleccion.colorPerla) {
        previewPerlas.innerHTML = '';
        previewPerlas.classList.add('visible');
        // Crear múltiples perlas
        for (let i = 0; i < 20; i++) {
            const perla = document.createElement('div');
            perla.className = 'perla';
            perla.style.backgroundColor = seleccion.colorPerla.color;
            perla.style.animationDelay = `${i * 0.05}s`;
            previewPerlas.appendChild(perla);
        }
        document.getElementById('info-perla').textContent = seleccion.colorPerla.nombre;
    }
    
    // Actualizar diseño
    if (seleccion.diseno) {
        const emojis = {
            'Flores': '🌸',
            'Estrellas': '⭐',
            'Corazones': '💖',
            'Mariposas': '🦋'
        };
        const emoji = emojis[seleccion.diseno.nombre] || '✨';
        previewDiseno.textContent = emoji;
        previewDiseno.classList.add('visible');
        document.getElementById('info-diseno').textContent = seleccion.diseno.nombre;
    }
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

// ========== FUNCIONES PARA LA GALERÍA ==========
function abrirImagen(src) {
    const modal = document.getElementById('modal-imagen');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    modal.style.display = 'block';
    imagenAmpliada.src = src;
}

function cerrarImagen() {
    const modal = document.getElementById('modal-imagen');
    modal.style.display = 'none';
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarImagen();
    }
});