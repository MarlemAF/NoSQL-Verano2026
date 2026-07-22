const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

async function iniciarServidor(){
   try{
    await mongoose.connect(
        "mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix"
    );
      console.log("Conectado correctamente a MongoDB");

      app.listen(PORT, () => {
        console.log(
         "Servidor iniciado en http://localhost:"+PORT);
      });
   }catch(error){
      console.error("No se pudo conectar con MongoDB");
      console.error(error.message);
   }

}
iniciarServidor();

// Esquemas

const peliculaSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true
        },
        genero: {
            type: String,
            required: true,
            trim: true
        },
        año: {
            type: Number,
            required: true,
            min: 1900
        },
        duracion: {
            type: Number,
            required: true,
            min: 1
        },
        idioma: {
            type: String,
            required: true,
            trim: true
        },
        calificacion: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        }
    },
    {
        timestamps: true
    }
);

const serieSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true
        },
        genero: {
            type: String,
            required: true,
            trim: true
        },
        año: {
            type: Number,
            required: true,
            min: 1900
        },
        temporadas: {
            type: Number,
            required: true,
            min: 1
        },
        episodios: {
            type: Number,
            required: true,
            min: 1
        },
        idioma: {
            type: String,
            required: true,
            trim: true
        },
        calificacion: {
            type: Number,
            required: true,
            min: 0,
            max: 10
        }
    },
    {
        timestamps: true
    }
);

// Modelos
const Pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");

const Serie = mongoose.model("Serie", serieSchema, "series");

// Rutas películas

// Obtener todas las películas
app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await Pelicula.find();

        res.json(peliculas);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las películas",
            error: error.message
        });
    }
});

// Obtener una película por ID
app.get("/peliculas/:id", async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);

        if (!pelicula) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json(pelicula);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la película",
            error: error.message
        });
    }
});

// Registrar una película
app.post("/peliculas", async (req, res) => {
    try {
        const {
            titulo,
            genero,
            año,
            duracion,
            idioma,
            calificacion
        } = req.body;

        if (
            !titulo ||
            !genero ||
            año === undefined ||
            duracion === undefined ||
            !idioma ||
            calificacion === undefined
        ) {
            return res.status(400).json({
                mensaje: "Faltan datos de la película"
            });
        }

        const nuevaPelicula = new Pelicula({
            titulo,
            genero,
            año,
            duracion,
            idioma,
            calificacion
        });

        const peliculaGuardada = await nuevaPelicula.save();

        res.status(201).json({
            mensaje: "Película registrada correctamente",
            pelicula: peliculaGuardada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al guardar la película",
            error: error.message
        });
    }
});

// Actualizar una película
app.put("/peliculas/:id", async (req, res) => {
    try {
        const {
            titulo,
            genero,
            año,
            duracion,
            idioma,
            calificacion
        } = req.body;

        if (
            !titulo ||
            !genero ||
            año === undefined ||
            duracion === undefined ||
            !idioma ||
            calificacion === undefined
        ) {
            return res.status(400).json({
                mensaje: "Faltan datos de la película"
            });
        }

        const peliculaActualizada =
            await Pelicula.findByIdAndUpdate(
                req.params.id,
                {
                    titulo,
                    genero,
                    año,
                    duracion,
                    idioma,
                    calificacion
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!peliculaActualizada) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json({
            mensaje: "Película actualizada correctamente",
            pelicula: peliculaActualizada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar la película",
            error: error.message
        });
    }
});

// Eliminar una película
app.delete("/peliculas/:id", async (req, res) => {
    try {
        const peliculaEliminada =
            await Pelicula.findByIdAndDelete(req.params.id);

        if (!peliculaEliminada) {
            return res.status(404).json({
                mensaje: "Película no encontrada"
            });
        }

        res.json({
            mensaje: "Película eliminada correctamente",
            pelicula: peliculaEliminada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la película",
            error: error.message
        });
    }
});

// Rutas Series

// Obtener todas las series
app.get("/series", async (req, res) => {
    try {
        const series = await Serie.find();

        res.json(series);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener las series",
            error: error.message
        });
    }
});

// Obtener una serie por ID
app.get("/series/:id", async (req, res) => {
    try {
        const serie = await Serie.findById(req.params.id);

        if (!serie) {
            return res.status(404).json({
                mensaje: "Serie no encontrada"
            });
        }

        res.json(serie);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la serie",
            error: error.message
        });
    }
});

// Registrar una serie
app.post("/series", async (req, res) => {
    try {
        const {
            titulo,
            genero,
            año,
            temporadas,
            episodios,
            idioma,
            calificacion
        } = req.body;

        if (
            !titulo ||
            !genero ||
            año === undefined ||
            temporadas === undefined ||
            episodios === undefined ||
            !idioma ||
            calificacion === undefined
        ) {
            return res.status(400).json({
                mensaje: "Faltan datos de la serie"
            });
        }

        const nuevaSerie = new Serie({
            titulo,
            genero,
            año,
            temporadas,
            episodios,
            idioma,
            calificacion
        });

        const serieGuardada = await nuevaSerie.save();

        res.status(201).json({
            mensaje: "Serie registrada correctamente",
            serie: serieGuardada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al guardar la serie",
            error: error.message
        });
    }
});

// Actualizar una serie
app.put("/series/:id", async (req, res) => {
    try {
        const {
            titulo,
            genero,
            año,
            temporadas,
            episodios,
            idioma,
            calificacion
        } = req.body;

        if (
            !titulo ||
            !genero ||
            año === undefined ||
            temporadas === undefined ||
            episodios === undefined ||
            !idioma ||
            calificacion === undefined
        ) {
            return res.status(400).json({
                mensaje: "Faltan datos de la serie"
            });
        }

        const serieActualizada =
            await Serie.findByIdAndUpdate(
                req.params.id,
                {
                    titulo,
                    genero,
                    año,
                    temporadas,
                    episodios,
                    idioma,
                    calificacion
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!serieActualizada) {
            return res.status(404).json({
                mensaje: "Serie no encontrada"
            });
        }

        res.json({
            mensaje: "Serie actualizada correctamente",
            serie: serieActualizada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar la serie",
            error: error.message
        });
    }
});

// Eliminar una serie
app.delete("/series/:id", async (req, res) => {
    try {
        const serieEliminada =
            await Serie.findByIdAndDelete(req.params.id);

        if (!serieEliminada) {
            return res.status(404).json({
                mensaje: "Serie no encontrada"
            });
        }

        res.json({
            mensaje: "Serie eliminada correctamente",
            serie: serieEliminada
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la serie",
            error: error.message
        });
    }
});

// Ruta principal
app.get("/", (req, res) => {
    res.send("API de películas y series");
});

app.listen(PORT, () => {
    console.log(
        "Servidor iniciado en http://localhost:" + PORT
    );
});