import { Router } from 'express'
import { obtenerEmpleados } from '../controllers/empleadosControllers.js'

const router = Router()

router.route('/:id').get(obtenerEmpleados)

export default router
