import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clienteModel from "../models/clientes.js";
import empleadoModel from "../models/empleados.js";
import { config } from "../config.js";

// Array de funciones
const loginController = {};

loginController.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    let userFound; // Guardar el usuario encontrado
    let userType; // Guardar el tipo de usuario

    // Admin, Empleados y Clientes
    if (correo === config.admin.email && contrasena === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      //Empleado
      userFound = await empleadoModel.findOne({ correo });
      userType = "employee";

      //Cliente
      if (!userFound) {
        userFound = await clienteModel.findOne({ correo });
        userType = "client";
      }
    }

    // Si no encuentra el usuario en ningun lado
    if (!userFound) {
      return res.json({ message: "user not found" });
    }

    // Desincriptar la contraseña si no es admin
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(contrasena, userFound.password);
      if (!isMatch) {
        res.json({ message: "Invalid password" });
      }
    }

    //TOKEN
    jsonwebtoken.sign(
      //1- ¿que voy a guardar?
      { id: userFound._id, userType },
      //2- secreto
      config.JWT.secret,
      //3- ¿cuando expira?
      { expiresIn: config.JWT.expires },
      //4- función flecha
      (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.json({ message: "login successful" });
      }
    );
  } catch (error) {
    console.log("error" + error);
  }
};

export default loginController;
