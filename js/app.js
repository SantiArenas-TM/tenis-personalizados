// URL del servidor backend
const API_URL = 'http://localhost:5000/api';

// Variables para guardar la selección del usuario
let seleccion = {
    modelo: null,
    colorPerla: null,
    diseno: null
};

// Variables globales de datos
let modelosTenis = [];
let coloresPerlas = [];
let disenosDisponibles = [];

// ========== CARGAR DATOS DESDE EL BACKEND ==========
async function cargarDatosDesdeAPI() {
    try {
        // Cargar los 3 datos al mismo tiempo
        const [modelosRes, coloresRes, disenosRes] = await Promise.all([
            fetch(`${API_URL}/modelos`),
            fetch(`${API_URL}/colores`),
            fetch(`${API_URL}/disenos`)
        ]);

        modelosTenis = await modelosRes.json();
        coloresPerlas = await coloresRes.json();
        disenosDisponibles = await disenosRes.json();

        // Renderizar todo
        cargarModelos();
        cargarColoresPerlas();
        cargarDisenos();

    } catch (error) {
        console.error('Error conectando con el servidor:', error);
        alert('⚠️ No se pudo conectar con el servidor. Asegúrate de que está corriendo.');
    }
}

// ========== CARGAR OPCIONES EN PANTALLA ==========
function cargarModelos() {
    const contenedor = document.querySelector('.selector-modelo');
    let divOpciones = contenedor.querySelector('.opciones-grid');
    if (!divOpciones) {
        divOpciones = document.createElement('div');
        divOpciones.className = 'opciones-grid';
        contenedor.appendChild(divOpciones);
    }
    divOpciones.innerHTML = '';

    modelosTenis.forEach(modelo => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-opcion';
        tarjeta.innerHTML = `
            <h4>${modelo.nombre}</h4>
            <button onclick="seleccionarModelo(${modelo.id})">Seleccionar</button>
        `;
        divOpciones.appendChild(tarjeta);
    });
}

function cargarColoresPerlas() {
    const contenedor = document.querySelector('.selector-perlas');
    let divOpciones = contenedor.querySelector('.opciones-grid');
    if (!divOpciones) {
        divOpciones = document.createElement('div');
        divOpciones.className = 'opciones-grid';
        contenedor.appendChild(divOpciones);
    }
    divOpciones.innerHTML = '';

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
}

function cargarDisenos() {
    const contenedor = document.querySelector('.selector-disenos');
    let divOpciones = contenedor.querySelector('.opciones-grid');
    if (!divOpciones) {
        divOpciones = document.createElement('div');
        divOpciones.className = 'opciones-grid';
        contenedor.appendChild(divOpciones);
    }
    divOpciones.innerHTML = '';

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
}

// ========== FUNCIONES DE SELECCIÓN CON ANIMACIONES ==========
function seleccionarModelo(id) {
    document.querySelectorAll('.selector-modelo .tarjeta-opcion').forEach(tarjeta => {
        tarjeta.classList.remove('seleccionada');
    });

    const tarjetas = document.querySelectorAll('.selector-modelo .tarjeta-opcion');
    const index = modelosTenis.findIndex(m => m.id === id);
    const tarjetaSeleccionada = tarjetas[index];
    tarjetaSeleccionada.classList.add('clicked');
    setTimeout(() => {
        tarjetaSeleccionada.classList.remove('clicked');
        tarjetaSeleccionada.classList.add('seleccionada');
    }, 150);

    seleccion.modelo = modelosTenis.find(m => m.id === id);
    document.getElementById('resumen-modelo').textContent = seleccion.modelo.nombre;
    actualizarVistaPrevia();
    actualizarBotonPedido();
}

function seleccionarPerla(id) {
    document.querySelectorAll('.selector-perlas .tarjeta-opcion').forEach(tarjeta => {
        tarjeta.classList.remove('seleccionada');
    });

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
    actualizarVistaPrevia();
    actualizarBotonPedido();
}

function seleccionarDiseno(id) {
    document.querySelectorAll('.selector-disenos .tarjeta-opcion').forEach(tarjeta => {
        tarjeta.classList.remove('seleccionada');
    });

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
    actualizarVistaPrevia();
    actualizarBotonPedido();
}

// ========== VISTA PREVIA ==========
function actualizarVistaPrevia() {
    const tenisBaseImg = document.getElementById('tenis-base-img');
    const capaPerlas = document.getElementById('capa-perlas');
    const capaDiseno = document.getElementById('capa-diseno');
    const mensajeInicial = document.getElementById('mensaje-inicial');

    if (seleccion.modelo) {
        mensajeInicial.classList.add('oculto');
        const nombreModelo = seleccion.modelo.nombre.toLowerCase();
        let imagenBase;

        if (nombreModelo.includes('nike') || nombreModelo.includes('air')) {
            imagenBase = 'images/tenis2.jpeg';
        } else if (nombreModelo.includes('converse') || nombreModelo.includes('venus') || nombreModelo.includes('bota')) {
            imagenBase = 'images/tenis1.jpeg';
        } else {
            imagenBase = 'images/tenis2.jpeg';
        }

        tenisBaseImg.src = imagenBase;
        tenisBaseImg.classList.remove('oculto');
        tenisBaseImg.classList.add('visible');
        document.getElementById('info-modelo').textContent = seleccion.modelo.nombre;
    }

    if (seleccion.colorPerla) {
        capaPerlas.innerHTML = '';
        for (let i = 0; i < 40; i++) {
            const perla = document.createElement('div');
            perla.className = 'perla-decoracion';
            perla.style.backgroundColor = seleccion.colorPerla.color;
            perla.style.animationDelay = `${i * 0.03}s`;
            capaPerlas.appendChild(perla);
        }
        document.getElementById('info-perla').textContent = seleccion.colorPerla.nombre;
    }

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

// ========== BOTÓN DE PEDIDO ==========
function actualizarBotonPedido() {
    const boton = document.getElementById('btn-enviar-pedido');
    if (seleccion.modelo && seleccion.colorPerla && seleccion.diseno) {
        boton.disabled = false;
    } else {
        boton.disabled = true;
    }
}

// ========== ENVIAR PEDIDO ==========
function enviarPedido() {
    // Mostrar resumen en el modal
    document.getElementById('pedido-resumen-modelo').textContent = seleccion.modelo.nombre;
    document.getElementById('pedido-resumen-perla').textContent = seleccion.colorPerla.nombre;
    document.getElementById('pedido-resumen-diseno').textContent = seleccion.diseno.nombre;
    
    // Mostrar modal
    document.getElementById('modal-pedido').style.display = 'flex';
}

function cerrarModalPedido() {
    document.getElementById('modal-pedido').style.display = 'none';
}

async function confirmarPedido() {
    const nombre = document.getElementById('pedido-nombre').value.trim();
    const telefono = document.getElementById('pedido-telefono').value.trim();
    const correo = document.getElementById('pedido-correo').value.trim();
    const talla = document.getElementById('pedido-talla').value;
    const pais = document.getElementById('pedido-pais').value.trim();
    const ciudad = document.getElementById('pedido-ciudad').value.trim();
    const barrio = document.getElementById('pedido-barrio').value.trim();
    const direccion = document.getElementById('pedido-direccion').value.trim();
    const mensaje = document.getElementById('pedido-mensaje').value.trim();

    // Validar campos obligatorios
    if (!nombre || !telefono || !talla || !direccion) {
        alert('⚠️ Por favor completa los campos obligatorios:\n- Nombre\n- Teléfono\n- Talla\n- Dirección');
        return;
    }

    const pedido = {
        nombre_cliente: nombre,
        telefono: telefono,
        correo: correo,
        talla: talla,
        pais: pais,
        ciudad: ciudad,
        barrio: barrio,
        direccion: direccion,
        modelo: seleccion.modelo.nombre,
        color_perla: seleccion.colorPerla.nombre,
        diseno: seleccion.diseno.nombre,
        mensaje: mensaje
    };

    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            cerrarModalPedido();
            mostrarConfirmacion(pedido);
        }
    } catch (error) {
        alert('❌ Error al enviar el pedido. Verifica que el servidor esté corriendo.');
    }
}

function mostrarConfirmacion(pedido) {
    const mensajeWhatsApp = 
`¡Hola Krystal Style! 👟✨

Quiero hacer un pedido:

👟 *Modelo:* ${pedido.modelo}
💎 *Perlas:* ${pedido.color_perla}
🎨 *Diseño:* ${pedido.diseno}
📏 *Talla:* ${pedido.talla}

👤 *Nombre:* ${pedido.nombre_cliente}
📱 *Teléfono:* ${pedido.telefono}
📧 *Correo:* ${pedido.correo || 'No especificado'}
🌍 *País:* ${pedido.pais || 'No especificado'}
🏙️ *Ciudad:* ${pedido.ciudad || 'No especificado'}
🏘️ *Barrio:* ${pedido.barrio || 'No especificado'}
🏠 *Dirección:* ${pedido.direccion}

📝 *Mensaje:* ${pedido.mensaje || 'Sin mensaje adicional'}

¡Gracias!`;

    const urlWhatsApp = `https://wa.me/573136915958?text=${encodeURIComponent(mensajeWhatsApp)}`;
    alert(`✅ ¡Pedido registrado exitosamente!\n\nTe redirigiremos a WhatsApp para confirmar tu pedido.`);
    window.open(urlWhatsApp, '_blank');
}

// ========== GALERÍA ==========
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
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('activo');
    });
    event.target.classList.add('activo');

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

// Cerrar modal con ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarImagen();
        cerrarModalPedido();
    }
});

// Iniciar cuando cargue la página
window.addEventListener('DOMContentLoaded', cargarDatosDesdeAPI);