import { Router } from 'express'
import {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  authEmpleado,
  crearEmpleado,
  actualizarEmpleado,
} from '../controllers/empleadosControllers.js'

const router = Router()

router
  .route('/')
  .get(obtenerEmpleados)
  .post(crearEmpleado)
  .put(actualizarEmpleado)
router.route('/auth').post(authEmpleado)
router.route('/:id').get(obtenerEmpleadoPorId)

export default router
