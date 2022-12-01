import { Router } from 'express'
import {
  obtenerSupervisores,
  crearSupervisor,
  obtenerIdEmpleado,
  obtenerEmpleadosPorSupervisor,
} from '../controllers/supervisoresController.js'

const router = Router()

//Rutas de supervisores
//Ruta base: /api/supervisores
router.route('/').get(obtenerSupervisores).post(crearSupervisor)
router.route('/:idauth0').get(obtenerIdEmpleado)
router.route('/:id/empleados').get(obtenerEmpleadosPorSupervisor)

export default router
