import express from "express";
import peliculasController from "../controllers/peliculasController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(peliculasController.getPelicula)
  .post(peliculasController.createEmpleado);

router
  .route("/:id")
  .put(peliculasController.updatePelicula)
  .delete(peliculasController.deletePelicula);

export default router;
