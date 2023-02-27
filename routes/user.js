import { Router } from 'express';
import { body, param } from 'express-validator';

import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/user.js';
import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const router = Router();

router.get('/', usuariosGet);

router.post('/', [
  body('nombre', 'El nombre es obligatorio').not().isEmpty(),
  body('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
  body('correo', 'El correo no es valido').custom(emailExiste).isEmail(),
  //body('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  body('rol').custom(esRolValido),
  validarCampos
], usuariosPost);

router.put('/:id', [
  param('id').custom(existeUsuarioPorId),
  body('rol').custom(esRolValido),
  validarCampos
], usuariosPut);

router.delete('/:id', [
  param('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);
