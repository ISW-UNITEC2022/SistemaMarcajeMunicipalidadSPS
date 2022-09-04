import { Router } from 'express'
import {
  obtenerSupervisores,
  crearSupervisor,
  obtenerIdEmpleado,
} from '../controllers/supervisoresController.js'

const router = Router()

router.route('/').get(obtenerSupervisores).post(crearSupervisor)
router.route('/:idauth0').get(obtenerIdEmpleado)

export default router
