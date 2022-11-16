import { Router } from 'express'
import {
  obtenerReportesTarde,
  obtenerReportesIncompletos,
  obtenerReportesAsistencias,
} from '../controllers/reportesController.js'

const router = Router()

router.post('/', obtenerReportesAsistencias)
router.post('/tarde', obtenerReportesTarde)
router.post('/incompleto', obtenerReportesIncompletos)

export default router
