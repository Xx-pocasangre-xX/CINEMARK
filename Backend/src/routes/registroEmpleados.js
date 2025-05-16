import express from "express";
import registroEmpleadosController from "../controllers/registroEmpleadosController.js";
const router = express.Router();

router.route("/").post(registroEmpleadosController.register);

export default router;
