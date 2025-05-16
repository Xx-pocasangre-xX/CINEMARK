import {v2 as cloudinary} from 'cloudinary';
import peliculasModel from "../models/peliculas.js";
import { config } from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const peliculasController = {};
// SELECT
peliculasController.getPeliculas = async (req, res) => {
  const pelicula = await peliculasModel.find();
  res.json(pelicula);
};

//INSERT
peliculasController.createPeliculas = async (req, res) => {
  const { titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion} = req.body;
  let imageURL = "";

  //subir la imagen a Cloudinary
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["jpg", "png", "jpeg"],
    });
    imageURL = result.secure_url;
  }
  //Guardar el registro en la base de datos
  const newpelicula = new peliculasModel({ titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion, 
        imagen: imageURL });
  newpelicula.save();

  res.json({ message: "pelicula saved" });
};

//UPDATE
peliculasController.updatePeliculas = async (req, res) => {
    const { titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion} = req.body;
    let imageURL = "";
  
    //subir la imagen a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageURL = result.secure_url;
    }
    //Actualizar la base de datos
    await peliculasModel.findByIdAndUpdate(req.params.id, {titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion, 
        imagen: imageURL }, {new: true});
  
    res.json({ message: "provider actualized" });
  };

//DELETE
peliculasController.deletePeliculas = async (req, res) => {
    const deletePeliculas = await peliculasModel.findByIdAndDelete(req.params.id);
    if (!deletePeliculas) {
      return res.status(404).json({ message: "pelicula not found" });
    }
    res.json({ message: "pelicula deleted" });
  };

export default peliculasController;
