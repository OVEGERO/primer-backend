import { response, request } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/user.js';

export const validarJWT = async( req=request, res=response, next ) => {

  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    });
  }

  try {

    const { uid } = await jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    const usuario = await Usuario.findById(uid);

    if ( !usuario ) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en DB'
      });
    }

    if ( !usuario.estado ) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en DB'
      });
    }

    req.usuario = usuario;
    
    next();

  } catch (error) {

    console.log(error);
    return res.status(401).json({
      msg: 'Token no válido'
    });

  }

};

