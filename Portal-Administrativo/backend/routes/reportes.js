import { Router } from 'express'
import {
  obtenerReportesTarde,
  obtenerReportesIncompletos,
  obtenerReportesAsistencias,
  obtenerFechasDisponible,
} from '../controllers/reportesController.js'

const router = Router()

router.post('/', obtenerReportesAsistencias)
router.get('/disponibles', obtenerFechasDisponible)
router.post('/tarde', obtenerReportesTarde)
router.post('/incompleto', obtenerReportesIncompletos)

export default router
