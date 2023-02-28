import { response } from "express"; 
import Usuario from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from "../helpers/generarJWT.js";

export const login = async(req, res=response) => {

  const { correo, password } = req.body;

  try {

    //verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if ( !usuario ) {
      return res.status(400).json({
        msg: 'Credenciales incorrectas - correo'
      });
    }

    //verificar si el usuario esta todavia activo
    if ( !usuario.estado ) {
      return res.status(400).json({
        msg: 'Credenciales incorrectas - estado: false'
      });
    }

    //veriricar las password
    const validPassword = bcrypt.compareSync( password, usuario.password );
    if ( !validPassword ) {
      return res.status(400).json({
        msg: 'Credenciales incorrectas - password'
      });
    }

    //generara el JWT
    const token = await generarJWT( usuario.id );

    return res.json({
      usuario,
      token
    });
    
  } catch (error) {
    
    console.log(error);

    res.status(500).json({
      msg: 'Hable con el administrador'
    });

  }

  res.json({
    msg: 'Login ok'
  });

};

