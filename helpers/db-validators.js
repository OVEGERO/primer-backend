import Role from '../models/role.js';
import Usuario from '../models/user.js';
import mongoose from 'mongoose';

export const esRolValido = async (rol = '') => {

  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }

};

export const emailExiste = async (correo = '') => {

  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado en la BD`)
  }

};

export const existeUsuarioPorId = async (id) => {

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const existeUsuario = await Usuario.findById(id).exec();
    if (!existeUsuario) {
      throw new Error(`El usuario con id ${id} no existe`);
    }
  } else {
    throw new Error(`El id ${id} no es un ID válido`);
  }

};

