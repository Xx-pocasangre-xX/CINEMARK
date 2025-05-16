import express from "express";
import registroClientesController from "../controllers/registroClientesController.js";
const router = express.Router();

router.route("/").post(registroClientesController.register);
router.route("/verifyCodeEmail").post(registroClientesController.verifyCodeEmail);

export default router;
