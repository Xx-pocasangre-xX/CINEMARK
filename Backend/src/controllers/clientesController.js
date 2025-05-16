//Array de metodos (C R U D)
const clientesController = {};
import clientesModel from "../models/clientes.js";

// SELECT
clientesController.getCliente = async (req, res) => {
  const cliente = await clientesModel.find();
  res.json(cliente);
};

// INSERT
clientesController.createCliente = async (req, res) => {
  const { nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        dui} = req.body;
  const newCliente= new clientesModel({ nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        dui});
  await newCliente.save();
  res.json({ message: "cliente save" });
};

// DELETE
clientesController.deleteCliente = async (req, res) => {
const deleteCliente = await clientesModel.findByIdAndDelete(req.params.id);
  if (!deleteCliente) {
    return res.status(404).json({ message: "cliente dont find" });
  }
  res.json({ message: "cliente deleted" });
};

// UPDATE
clientesController.updateCliente = async (req, res) => {
  // Solicito todos los valores
  const {nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        dui} = req.body;
  // Actualizo
  await clientesModel.findByIdAndUpdate(
    req.params.id,
    {
        nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        dui
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "cliente update" });
};

export default clientesController;
