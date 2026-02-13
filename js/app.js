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

// Función para actualizar la vista previa realista
function actualizarVistaPrevia() {
    const tenisBaseImg = document.getElementById('tenis-base-img');
    const capaPerlas = document.getElementById('capa-perlas');
    const capaDiseno = document.getElementById('capa-diseno');
    const mensajeInicial = document.getElementById('mensaje-inicial');
    
    // Actualizar modelo (imagen base)
    if (seleccion.modelo) {
        mensajeInicial.classList.add('oculto');
        
        // Determinar qué imagen usar (fotos reales)
        let imagenBase;
        const nombreModelo = seleccion.modelo.nombre.toLowerCase();

        if (nombreModelo.includes('nike') || nombreModelo.includes('air')) {
            imagenBase = 'images/tenis2.jpeg';
        } else if (nombreModelo.includes('converse') || nombreModelo.includes('venus') || nombreModelo.includes('bota')) {
        }else {
            // Por defecto usar Nike si no coincide
            imagenBase = 'images/tenis2.jpeg';
        }
        
        tenisBaseImg.src = imagenBase;
        tenisBaseImg.classList.remove('oculto');
        tenisBaseImg.classList.add('visible');
        
        document.getElementById('info-modelo').textContent = seleccion.modelo.nombre;
    }
    
    // Actualizar perlas
    if (seleccion.colorPerla) {
        capaPerlas.innerHTML = '';
        
        // Crear patrón de perlas (40 perlas distribuidas)
        for (let i = 0; i < 40; i++) {
            const perla = document.createElement('div');
            perla.className = 'perla-decoracion';
            perla.style.backgroundColor = seleccion.colorPerla.color;
            perla.style.animationDelay = `${i * 0.03}s`;
            capaPerlas.appendChild(perla);
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
        capaDiseno.textContent = emoji;
        capaDiseno.classList.add('visible');
        
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
// ========== GALERÍA MEJORADA ==========
function abrirImagen(src, titulo) {
    const modal = document.getElementById('modal-imagen');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    const modalTitulo = document.getElementById('modal-titulo');
    modal.style.display = 'block';
    imagenAmpliada.src = src;
    if (titulo) modalTitulo.textContent = titulo;
    document.body.style.overflow = 'hidden';
}

function cerrarImagen() {
    const modal = document.getElementById('modal-imagen');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function filtrarGaleria(categoria) {
    // Actualizar botones
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('activo');
    });
    event.target.classList.add('activo');

    // Filtrar imágenes
    document.querySelectorAll('.galeria-item').forEach(item => {
        if (categoria === 'todos') {
            item.classList.remove('oculto');
        } else {
            if (item.dataset.categoria === categoria) {
                item.classList.remove('oculto');
            } else {
                item.classList.add('oculto');
            }
        }
    });
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarImagen();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarImagen();
    }
});