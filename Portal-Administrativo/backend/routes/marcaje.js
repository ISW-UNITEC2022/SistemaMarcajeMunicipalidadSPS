import { Router } from 'express'
import {
  marcarEmpleado,
  validarMarca,
} from '../controllers/marcajeController.js'

const router = Router()

router.route('/').post(marcarEmpleado)
router.route('/:correo').get(validarMarca)

export default router
