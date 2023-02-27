import { response } from "express";
import Usuario from '../models/user.js';
import bcrypt from 'bcryptjs';

export const usuariosGet = async(req, res=response) => {

  const { limite=5, desde=0 } = req.query;

  const query = { estado: true };

  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip( Number( desde ) )
    .limit( Number( limite ) )
  ]);

  res.json({
    total,
    usuarios
  });
};

export const usuariosPost = async( req, res=response ) => {

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario( { nombre, correo, password, rol } );

  //Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync( password, salt );

  //guardar en bd
  await usuario.save();

  res.json(usuario);
};

export const usuariosPut = async( req, res=response ) => {

  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if ( password ) {
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync( password, salt );
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto, { new: true } );

  res.json(usuario);
};

export const usuariosPatch = ( req, res=response ) => {
  res.json({
    msg: 'patch API - controlador'
  });
};

export const usuariosDelete = async( req, res=response ) => {

  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true } );

  res.json(usuario);
};

