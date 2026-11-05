const express = require('express');
const router = express.Router();

// Importamos las funciones de nuestro controlador
const actController = require('../controllers/actController');

// Ruta para consultar todas las actividades (GET)
router.get('/', actController.obtenerActs);

// Ruta para registrar una nueva actividad (POST)
router.post('/', actController.crearActs);

// Ruta para modificar una actividad existente por su ID (PUT)
router.put('/:id', actController.actualizarActs);

// Ruta para borrar una actividad por su ID (DELETE)
router.delete('/:id', actController.eliminarActs);

// Exportamos el enrutador para que app.js lo utilice
module.exports = router;