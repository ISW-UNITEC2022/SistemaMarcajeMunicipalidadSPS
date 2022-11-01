import { Router } from 'express'
import {
  obtenerReportesTarde,
  obtenerReportesIncompletos,
  obtenerReportesAsistencias,
} from '../controllers/reportesController.js'

const router = Router()

router.get('/', obtenerReportesAsistencias)
router.get('/tarde', obtenerReportesTarde)
router.get('/incompleto', obtenerReportesIncompletos)

export default router
