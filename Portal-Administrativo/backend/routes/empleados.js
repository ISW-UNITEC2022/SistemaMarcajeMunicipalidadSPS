import { Router } from 'express'
import {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  authEmpleado,
  crearEmpleado,
} from '../controllers/empleadosControllers.js'

const router = Router()

router.route('/').get(obtenerEmpleados).post(crearEmpleado)
router.route('/auth').post(authEmpleado)
router.route('/:id').get(obtenerEmpleadoPorId)

export default router
