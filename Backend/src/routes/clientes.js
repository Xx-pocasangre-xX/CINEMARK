import express from "express";
import clientesController from "../controllers/clientesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(clientesController.getCliente)
  .post(clientesController.createCliente);

router
  .route("/:id")
  .put(clientesController.updateCliente)
  .delete(clientesController.deleteCliente);

export default router;
