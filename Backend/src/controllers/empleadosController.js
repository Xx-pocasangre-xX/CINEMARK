//Array de metodos (C R U D)
const empleadosController = {};
import empleadosModel from "../models/empleados.js";

// SELECT
empleadosController.getEmpleado = async (req, res) => {
  const empleado = await empleadosModel.find();
  res.json(empleado);
};

// INSERT
empleadosController.createEmpleado = async (req, res) => {
  const { nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        dui} = req.body;
  const newEmpleado= new empleadosModel({ nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        dui});
  await newEmpleado.save();
  res.json({ message: "empleado save" });
};

// DELETE
empleadosController.deleteEmpleado = async (req, res) => {
const deleteEmpleado = await empleadosModel.findByIdAndDelete(req.params.id);
  if (!deleteEmpleado) {
    return res.status(404).json({ message: "empleado dont find" });
  }
  res.json({ message: "empleado deleted" });
};

// UPDATE
empleadosController.updateEmpleado = async (req, res) => {
  // Solicito todos los valores
  const {nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        dui} = req.body;
  // Actualizo
  await empleadosModel.findByIdAndUpdate(
    req.params.id,
    {
        nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        dui
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "empleado update" });
};

export default empleadosController;
