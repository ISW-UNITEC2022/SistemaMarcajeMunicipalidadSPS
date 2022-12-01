import { Router } from 'express'
import {
  marcarEmpleado,
  validarMarca,
} from '../controllers/marcajeController.js'

const router = Router()

//Rutas de marcas
//Ruta base: /api/marcaje
router.route('/').post(marcarEmpleado)
router.route('/:correo').get(validarMarca)

export default router
