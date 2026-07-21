const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
const PORT = 3000;

app.use(cors());

mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix")
.then(() => {
    console.log("Conectado correctamente a MongoDB");
})
.catch((error) => {
    console.error("Error al conectar MongoDB:", error);
});

//ESQUEMA
const peliculaSchema = new mongoose.Schema(
{
    titulo: { type: String, required: true, trim: true },
    genero: { type: String, required: true, trim: true },
    año: { type: Number, required: true },
    duracion: { type: Number, required: true },
    idioma: { type: String, required: true, trim: true },
    calificacion: { type: Number, required: true, min: 0, max: 10 },
    nc: { type: String, required: true, trim: true }
},
{
    timestamps: true
}
);

const Pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");

//GET
app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las películas",
            error: error
        });
    }
});

//GET CON ID
app.get("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                mensaje: "ID no válido"
            });
        }

        const pelicula = await Pelicula.findById(id);

        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json(pelicula);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la película",
            error: error
        });
    }
});

app.get("/", (req, res) =>{
    res.send("API de peliculas y series");
});
//
app.listen(PORT,() => {  
console.log("Servidor iniciado en http://localhost:"+PORT);
});