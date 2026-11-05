const express = require("express"); //Importa la dependencia express
const path = require("path"); //Con esto le decimos que trabaje con los archivos y carpetas de mi PC

require ('dotenv').config();
const actRouter = require('./routers/actRouter.js'); //Que acceda al archivo Routes

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../Frontend')));

//Que tome el archivo HTML de Frontend usando dirname
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index/Actividad.html'));
});

app.use('/actividades', actRouter);

//Le decimos que se ejecute en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
