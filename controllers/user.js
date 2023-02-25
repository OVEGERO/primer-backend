import { response } from "express";

export const usuariosGet = (req, res=response) => {

  const { q, nombre='No Name', apikey } = req.query;

  res.json({
    msg: 'get API - controlador',
    q,
    nombre,
    apikey
  });
};

export const usuariosPost = ( req, res=response ) => {

  const { nombre, edad } = req.body;

  res.json({
    msg: 'post API - controlador',
    nombre,
    edad
  });
};

export const usuariosPut = ( req, res=response ) => {

  const { id } = req.params;

  res.json({
    msg: 'put API - controlador',
    id
  });
};

export const usuariosPatch = ( req, res=response ) => {
  res.json({
    msg: 'patch API - controlador'
  });
};

export const usuariosDelete = ( req, res=response ) => {
  res.json({
    msg: 'delete API - controlador'
  });
};

