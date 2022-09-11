import { Router } from 'express'
import {
  obtenerSupervisores,
  crearSupervisor,
  obtenerIdEmpleado,
  obtenerEmpleadosPorSupervisor,
} from '../controllers/supervisoresController.js'

const router = Router()

router.route('/').get(obtenerSupervisores).post(crearSupervisor)
router.route('/:idauth0').get(obtenerIdEmpleado)
router.route('/:idsupervisor/empleados').get(obtenerEmpleadosPorSupervisor)

export default router
