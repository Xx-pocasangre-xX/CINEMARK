import express from "express";
import peliculasController from "../controllers/peliculasController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(peliculasController.getPeliculas)
  .post(peliculasController.createPeliculas);

router
  .route("/:id")
  .put(peliculasController.updatePeliculas)
  .delete(peliculasController.deletePeliculas);

export default router;
