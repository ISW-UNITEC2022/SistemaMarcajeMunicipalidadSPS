import { Router } from 'express'
import {
  obtenerEmpleados,
  obtenerEmpleado,
  authEmpleado,
  crearEmpleado,
} from '../controllers/empleadosControllers.js'

const router = Router()

router.route('/').get(obtenerEmpleados).post(crearEmpleado)
router.route('/auth').post(authEmpleado)
router.route('/:id').get(obtenerEmpleado)

export default router
