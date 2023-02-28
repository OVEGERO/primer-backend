import { Router } from 'express';
import { body, param } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const routerAuth = Router();

routerAuth.post('/login', [
    body('correo', 'El correo es obligatorio').isEmail(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

routerAuth.post('/google', [
    body('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);
