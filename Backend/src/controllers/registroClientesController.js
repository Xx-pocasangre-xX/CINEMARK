import nodemailer from "nodemailer"; //Enviar correo
import crypto from "crypto"; //Generar codigo aleatorio
import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; //Encriptar

import clientesModel from "../models/clientes.js";
import { config } from "../config.js";

// Creo un array de funciones
const registroClienteController = {};

registroClienteController.register = async (req, res) => {
  // Pedir las cosas que voy a guardar
  const {
    nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        dui,
  } = req.body;

  try {
    //1- Verificar si el cliente ya existe
    const existsClient = await clientesModel.findOne({ correo });
    if (existsClient) {
      return res.json({ message: "Client already exists" });
    }

    //2- Encriptar contraseña
    const passwordHash = await bcryptjs.hash(contrasena, 10);

    //3- Guardamos al nuevo cliente
    const newClient = new clientesModel({
      nombre,
        nombre,
        correo,
        contrasena: passwordHash,
        telefono,
        direccion,
        dui: dui || null,
    });

    await newClient.save();

    // Generar un código aleatorio
    const verificationCode = crypto.randomBytes(3).toString("hex");

    // Genero un token para guardar el codigo aleatorio
    const tokenCode = jsonwebtoken.sign(
      //1- ¿Que vamos a guardar?
      { correo, verificationCode },
      //2- Secret key
      config.JWT.secret,
      //3- Cuando expira
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    //Enviar correo
    //1- Transporter => Quien lo envia
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailUser.user_email,
        pass: config.emailUser.user_pass,
      },
    });

    // 2- mailOptions => Quien lo recibe
    const mailOptions = {
      from: config.emailUser.user_email,
      to: correo,
      subject: "Verificacion de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este codigo: " +
        verificationCode +
        "expira en dos horas",
    };

    // 3- Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("error" + error);
      res.json({ message: "correo sent" + info });
    });
    res.json({ message: "Client registered, please verify your correo" });
  } catch (error) {
    console.log("error" + error);
    res.json({ message: "Error" + error });
  }
};

///////////////Verificar codigo //////////////

registroClienteController.verifyCodeEmail = async (req, res) => {
  const { verificationCodeRequest } = req.body;

  //1- Obtener el token
  const token = req.cookies.verificationToken;

  //2- Verificar y decodificar el token
  const decoded = jsonwebtoken.verify(token, config.JWT.secret);
  const { correo, verificationCode: storedCode } = decoded;

  //3- Comparar los codigos
  if (verificationCodeRequest !== storedCode) {
    return res.json({ mesage: "Invalid code." });
  }

  //Si el codigo es igual, entonces, colocamos el campo
  // "isVerified" en true
  const client = await clientesModel.findOne({ correo });
  client.isVerified = true;
  await client.save();

  res.clearCookie("verificationToken");

  res.json({ message: "correo verified Successfully" });
};

export default registroClienteController;
