import { Router } from 'express'
import {
  obtenerEmpleados,
  obtenerEmpleado,
} from '../controllers/empleadosControllers.js'

const router = Router()

router.route('/').get(obtenerEmpleados)
router.route('/:id').get(obtenerEmpleado)

export default router
