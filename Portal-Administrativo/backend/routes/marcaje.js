import { Router } from 'express'
import { marcarEmpleado } from '../controllers/marcajeController.js'

const router = Router()

router.route('/').post(marcarEmpleado)

export default router
