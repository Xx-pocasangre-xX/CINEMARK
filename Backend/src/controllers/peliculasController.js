//Array de metodos (C R U D)
const peliculasController = {};
import peliculasModel from "../models/peliculas.js";

// SELECT
peliculasController.getPeliculas = async (req, res) => {
  const peliculas = await peliculasModel.find();
  res.json(peliculas);
};

// INSERT
peliculasController.createPeliculas = async (req, res) => {
  const {titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion, 
        imagen} = req.body;
  const newPeliculas= new peliculasModel({ titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion, 
        imagen});
  await newPeliculas.save();
  res.json({ message: "peliculas save" });
};

// DELETE
peliculasController.deletePeliculas = async (req, res) => {
const deletePeliculas = await peliculasModel.findByIdAndDelete(req.params.id);
  if (!deletePeliculas) {
    return res.status(404).json({ message: "peliculas dont find" });
  }
  res.json({ message: "peliculas deleted" });
};

// UPDATE
peliculasController.updatePeliculas = async (req, res) => {
  // Solicito todos los valores
  const {titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion, 
        imagen} = req.body;
  // Actualizo
  await peliculasModel.findByIdAndUpdate(
    req.params.id,
    {
        titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion, 
        imagen
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "peliculas update" });
};

export default peliculasController;
