const conexion = require('../database')

async function crearActs(nombre, materia, estado, prioridad) //Damos los parametros a la funcion
{
    const db = await conexion(); //Hacemos conexion a la BD

    //Hacemos el Insert a la BD
    const sql = `
        INSERT INTO actividades (nombre, materia, estado, prioridad)
        VALUES (?, ?, ?, ?)
    `;

    // Ejecutamos la consulta
    const [resultado] = await db.execute(sql, 
    [
        nombre,
        materia,
        estado,
        prioridad
    ]);

    await db.end(); //Finalizamos conexion a la BD

    return resultado.insertId;  //Devolvemos la actividad creada
}

async function obtenerActs() 
{  
    const db = await conexion() //Hacemos conexion a la BD
    const [obtenido] = await db.execute //Ejecuta la consulta
    (
        'SELECT * FROM actividades' //Hacemos el SELECT de los registros
    );

    await db.end(); //Finalizamos conexion a la BD

    return obtenido; //Devolvemos las actividades encontradas
}

async function actualizarActs(id, nombre, materia, estado, prioridad) //Damos los parametros a la funcion
{
    const db = await conexion() //Hacemos conexion a la BD

    //Hacemos el Update en la BD
    const sql = `
        UPDATE actividades 
        SET nombre = ?, materia = ?, estado = ?, prioridad = ? 
        WHERE id_actividad = ?
    `;

    //Ejecutamos la modificacion
    const [actualizado] = await db.execute(sql, 
    [
        nombre,
        materia,
        estado,
        prioridad,
        id
    ]);

    await db.end(); //Finalizamos conexion a la BD

    return actualizado; //Devolvemos la actividad ya modificada
}

// Función para eliminar una actividad por su ID
async function eliminarActs(id) 
{
    const db = await conexion(); // Hacemos conexion a la BD

    const sql = `
    DELETE 
    FROM actividades 
    WHERE id_actividad = ?
    `;

    const [eliminado] = await db.execute(sql, [id]);

    await db.end(); // Cerramos la conexión a la BD

    return eliminado; // Devolvemos el resultado de la operación
}

// Exportamos las funciones para el controlador
module.exports = {
    crearActs,
    obtenerActs,
    actualizarActs,
    eliminarActs
};