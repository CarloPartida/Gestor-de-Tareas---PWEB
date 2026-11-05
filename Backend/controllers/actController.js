const actModel = require('../models/actModel');
const estado = 'Pendiente'; //Definimos por default que esté en pendiente

//Función para Crear Actividades
async function crearActs(req, res) 
{
    try
    {   //Solicitamos los Datos
        const nombre = req.body.nombre;
        const materia = req.body.materia;
        const prioridad = req.body.prioridad;

        if
        (   //Validaciones
            typeof nombre !== 'string' || !nombre.trim() ||
            typeof materia !== 'string'  || !materia.trim() ||
            typeof prioridad !== 'string' || !prioridad.trim()
        )

        { //Mandamos el error en caso de que no cumpla
           return res.status(400).send('Campo en blanco o dato invalido'); 
        }

        const id = await actModel.crearActs
        (   //Mandamos los datos al Model
            nombre.trim(),
            materia.trim(),
            estado,
            prioridad.trim()
        )
        return res.status(201).json({ mensaje: 'Actividad registrada', id });
    }    
    catch (error) 
    {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
}

// Función para consultar las actividades
async function obtenerActs(req, res) {
    try 
    {
        // Le pedimos al Modelo que consulte la base de datos
        const actividades = await actModel.obtenerActs();

        // Le enviamos la lista directamente al navegador
        return res.json(actividades);

    } 
    catch (error) 
    {
        console.error(error);
        return res.status(500).send('Error al obtener las actividades');
    }
}

// Función para modificar todos los datos de una actividad
async function actualizarActs(req, res) {
    try 
    {
        // Tomamos el ID desde la URL
        const id = req.params.id;
        
        // Tomamos todos los campos enviados desde el Frontend
        const nombre = req.body.nombre;
        const materia = req.body.materia;
        const estado = req.body.estado;
        const prioridad = req.body.prioridad;

        // Validamos que ningún campo esté vacío
        if
        (
            typeof nombre !== 'string' || !nombre.trim() ||
            typeof materia !== 'string' || !materia.trim() ||
            typeof estado !== 'string' || !estado.trim() ||
            typeof prioridad !== 'string' || !prioridad.trim()
        )
        {
            return res.status(400).send('Campo en blanco o dato inválido');
        }

        // Le enviamos los 5 parámetros al Modelo
        await actModel.actualizarActs(
            id,
            nombre.trim(),
            materia.trim(),
            estado.trim(),
            prioridad.trim()
        );

        // Respondemos confirmando el cambio
        return res.json({ mensaje: 'Actividad actualizada correctamente' });

    } 
    catch (error) 
    {
        console.error(error);
        return res.status(500).send('Error al actualizar la actividad');
    }
}

// Función para borrar una actividad
async function eliminarActs(req, res) {
    try 
    {
        // Tomamos el ID desde la URL
        const id = req.params.id;

        // Le pedimos al modelo que borre la fila en MySQL
        await actModel.eliminarActs(id);

        // Respondemos que se borró con éxito
        return res.json({ mensaje: 'Actividad eliminada' });

    } 
    catch (error) 
    {
        console.error(error);
        return res.status(500).send('Error al eliminar la actividad');
    }
}

module.exports = //Mandamos las funciones a Routes
{
    crearActs,
    obtenerActs,
    actualizarActs,
    eliminarActs
};