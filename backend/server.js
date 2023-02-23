const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const DBConnection = require('./src/database/connection')
DBConnection();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
require("dotenv").config();

// Rutas
app.use(require("./routes/user.routes"));
app.use(require("./routes/auth.routes"));
app.use(require("./routes/turn.routes"));

const port = 4000;
app.listen(port, () => console.log(`➔ | Servidor escuchando en el puerto ${port}`));