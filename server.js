require("dotenv").config();
console.log("API_KEY cargada:", Boolean(process.env.API_KEY));

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const ORIGENES = (process.env.ORIGEN_PERMITIDO || "")
    .split(",")
    .map(origen => origen.trim())
    .filter(Boolean);

app.use(cors({ origin: ORIGENES }));
app.use(express.json());

// Datos en memoria (en P3 se pueden pasar a una base de datos)
let productos = [
    { id: 1, nombre: "Teclado", precio: 350, stock: 10 },
    { id: 2, nombre: "Mouse", precio: 180, stock: 25 }
];

let siguienteId = 3;

app.post("/api/productos", requiereToken, (req, res) => {
    const errores = validar(req.body);

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    const nuevo = {
        id: siguienteId++,
        ...req.body
    };

    productos.push(nuevo);

    res.status(201).json(nuevo);
});

app.put("/api/productos/:id", requiereToken, (req, res) => {
    const id = Number(req.params.id);

    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            error: `No existe el producto ${id}`
        });
    }

    const errores = validar(req.body);

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    productos[indice] = {
        id,
        ...req.body
    };

    res.status(200).json(productos[indice]);
});

app.delete("/api/productos/:id", requiereToken, (req, res) => {
    const id = Number(req.params.id);

    const existe = productos.some(p => p.id === id);

    if (!existe) {
        return res.status(404).json({
            error: `No existe el producto ${id}`
        });
    }

    productos = productos.filter(p => p.id !== id);

    res.status(204).send();
});

app.get("/", (req, res) => {
    res.json({ mensaje: "API de productos funcionando" });
});


 // Consultar todos los productos
app.get("/api/productos", (req, res) => {
    res.status(200).json(productos);
});

// Consultar un producto por ID
app.get("/api/productos", (req, res) => {
    const buscar = req.query.buscar;

    if (buscar) {
        const resultado = productos.filter(p =>
            p.nombre.toLowerCase().includes(buscar.toLowerCase())
        );

        return res.status(200).json(resultado);
    }

    res.status(200).json(productos);
});


function validar(datos) {
    const errores = [];

    if (!datos.nombre || typeof datos.nombre !== "string") {
        errores.push("nombre es obligatorio");
    }

    if (typeof datos.precio !== "number" || datos.precio < 0) {
        errores.push("precio debe ser un número positivo");
    }

    if (!Number.isInteger(datos.stock) || datos.stock < 0) {
        errores.push("stock debe ser un entero positivo");
    }

    return errores;
}

function requiereToken(req, res, next) {
    if (!process.env.API_KEY ||
        req.get("x-api-key") !== process.env.API_KEY) {

        return res.status(401).json({
            error: "Token inválido o ausente"
        });
    }

    next();
}

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada"
    });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
