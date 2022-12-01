import { Router } from 'express'
import {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  authEmpleado,
  crearEmpleado,
  actualizarEmpleado,
  obtenerEmpleadosPorRol,
  actualizarStatus,
  obtenerHistorialDeMarca,
  borrarEmpleado,
} from '../controllers/empleadosControllers.js'

const router = Router()

//Rutas de empleados
//Ruta base: /api/empleados
router
  .route('/')
  .get(obtenerEmpleados)
  .post(crearEmpleado)
  .put(actualizarEmpleado)
  .delete(borrarEmpleado)
router.route('/rol').get(obtenerEmpleadosPorRol)
router.route('/auth').post(authEmpleado)
router.route('/:id').get(obtenerEmpleadoPorId)
router.route('/status').put(actualizarStatus)
router.route('/historial/:idempleado').get(obtenerHistorialDeMarca)

export default router
