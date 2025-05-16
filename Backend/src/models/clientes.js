/*
    Campos:
        nombre,
        correo,
        contrasena,
        telefono,
        direccion,
        dui
*/

import { Schema, model } from "mongoose";

const clientesSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
    },

    correo: {
      type: String,
      require: true,
    },

    contrasena: {
      type: String,
      require: true
    },

    telefono: {
      type: String,
        require: true,
    },

    direccion: {
      type: String,
        require: true,
    },

    dui: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("clientes", clientesSchema);