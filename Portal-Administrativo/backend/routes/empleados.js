import { Router } from 'express'
import {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  authEmpleado,
  crearEmpleado,
  actualizarEmpleado,
  obtenerEmpleadosPorRol,
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

export default router
