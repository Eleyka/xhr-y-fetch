// guardamos toda la dependencia del express
const express = require('express');
// traeme todos los recursos y guardame en esta variable

const app = express();
// creamos el servidor
const server = app.listen(3000, encender);
function encender() {
  console.log('servidor encendido');
}
app.use(express.static('public'));