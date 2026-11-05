// Seleccionamos los elementos del HTML mediante sus IDs
const form = document.getElementById('formulario-actividad');
const lista = document.getElementById('lista-actividades');

// Función para obtener y consultar las actividades (GET)
async function obtenerActs() {
    const res = await fetch('/actividades'); // Realizamos la petición al servidor
    const actividades = await res.json(); // Convertimos la respuesta a formato JSON

    // Generamos las tarjetas en el HTML recorriendo el arreglo de actividades
    lista.innerHTML = actividades.map(act => `
        <div class="tarjeta-actividad">
            <h3>${act.nombre} (${act.materia})</h3>
            <p><strong>Prioridad:</strong> ${act.prioridad}</p>
            <p><strong>Estado:</strong> ${act.estado}</p>
            <button onclick="editarAct(${act.id_actividad})">Editar</button>
            <button onclick="borrarAct(${act.id_actividad})">Eliminar</button>
        </div>
    `).join('');
}

// Registrar una nueva actividad (POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos la recarga automática de la página

    // Enviamos los datos recolectados al Backend
    await fetch('/actividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: form.nombre.value,
            materia: form.materia.value,
            estado: 'Pendiente', // Asignamos 'Pendiente' como estado por defecto
            prioridad: form.prioridad.value
        })
    });

    form.reset(); // Limpiamos los inputs del formulario
    obtenerActs(); // Actualizamos la vista de la lista
});

// Modificar todos los campos de una actividad (PUT)
async function editarAct(id) {
    // Solicitamos la nueva información al usuario
    const nombre = prompt('Nuevo Nombre:');
    const materia = prompt('Nueva Materia:');
    const estado = prompt('Nuevo Estado (Pendiente / En Proceso / Completada):');
    const prioridad = prompt('Nueva Prioridad (Alta / Media / Baja):');

    // Validamos que no se manden respuestas vacías o canceladas
    if (!nombre || !materia || !estado || !prioridad) {
        alert('Debes llenar todos los campos para actualizar.');
        return;
    }

    // Enviamos los cambios al Backend indicando el id de la actividad en la URL
    await fetch(`/actividades/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, materia, estado, prioridad })
    });

    obtenerActs(); // Actualizamos la lista con las modificaciones hechas
}

// Eliminar actividad por su id_actividad (DELETE)
async function borrarAct(id) {
    // Solicitamos confirmación previa antes de borrar de la base de datos
    if (confirm('¿Deseas eliminar esta actividad?')) {
        await fetch(`/actividades/${id}`, { method: 'DELETE' }); // Enviamos la solicitud DELETE
        obtenerActs(); // Actualizamos la lista
    }
}

// Ejecución inicial para cargar los registros existentes al entrar a la página
obtenerActs();
