import { Router } from 'express'
import {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  authEmpleado,
  crearEmpleado,
  actualizarEmpleado,
  obtenerEmpleadosPorRol,
  actualizarStatus,
} from '../controllers/empleadosControllers.js'

const router = Router()

router
  .route('/')
  .get(obtenerEmpleados)
  .post(crearEmpleado)
  .put(actualizarEmpleado)
router.route('/rol').get(obtenerEmpleadosPorRol)
router.route('/auth').post(authEmpleado)
router.route('/:id').get(obtenerEmpleadoPorId)
router.route('/status').put(actualizarStatus)

export default router
