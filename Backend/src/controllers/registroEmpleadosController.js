// Importamos el modelo de la base de datos
import empleadosModel from "../models/empleados.js";
// Importamos librerias
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // Token
import { config } from "../config.js";

// Cremos un array de funciones
const registroEmpleadosController = {};

registroEmpleadosController.register = async (req, res) => {
  // pedimos los campos que vamos a registrar
  const {
    nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        dui
  } = req.body;

  try {
    // Verificamos si el empleado ya existe
    const employeeExist = await empleadosModel.findOne({ correo });
    if (employeeExist) {
      return res.json({ message: "Employee already exist" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(contrasena, 10);

    // Guardamos el empleado en la base de datos
    const newEmployee = new empleadosModel({
      nombre,
        correo,
        contrasena: passwordHash,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        dui
    });

    await newEmployee.save();

    // TOKEN
    jsonwebtoken.sign(
      //1- Que voy a guardar
      { id: newEmployee._id },
      //2- secreto
      config.JWT.secret,
      //3- Cuando expira
      { expiresIn: config.JWT.expires },
      //4- funcion flecha
      (error, token) => {
        if (error) console.log("error");

        res.cookie("authToken", token);
        res.json({ message: "Employee registed" });
      }
    );
    
  } catch (error) {
    console.log("error" + error);
    res.json({ message: "Error" });
  }
};

export default registroEmpleadosController;
