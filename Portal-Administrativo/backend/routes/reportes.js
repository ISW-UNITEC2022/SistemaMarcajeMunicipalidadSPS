import { Router } from 'express'
import {
  obtenerReportesTarde,
  obtenerReportesIncompletos,
} from '../controllers/reportesController.js'

const router = Router()

router.get('/tarde', obtenerReportesTarde)
router.get('/incompleto', obtenerReportesIncompletos)

export default router
