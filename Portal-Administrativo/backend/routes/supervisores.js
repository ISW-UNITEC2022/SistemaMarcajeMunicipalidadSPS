import { Router } from 'express'
import {
  obtenerSupervisores,
  crearSupervisor,
} from '../controllers/supervisoresController.js'

const router = Router()

router.route('/').get(obtenerSupervisores).post(crearSupervisor)

export default router
