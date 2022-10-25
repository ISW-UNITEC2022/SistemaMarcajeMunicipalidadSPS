import { Router } from 'express'
import { obtenerReportesTarde } from '../controllers/reportesController.js'

const router = Router()

router.get('/tarde', obtenerReportesTarde)

export default router
