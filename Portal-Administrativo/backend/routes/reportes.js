import { Router } from 'express'
import {
  obtenerReportesTarde,
  obtenerReportesIncompletos,
  obtenerReportesAsistencias,
  obtenerFechasDisponible,
  enviarCorreo,
} from '../controllers/reportesController.js'

const router = Router()

//Rutas de reportes
//Ruta base: /api/reportes
router.post('/', obtenerReportesAsistencias)
router.post('/correo', enviarCorreo)
router.get('/disponibles', obtenerFechasDisponible)
router.post('/tarde', obtenerReportesTarde)
router.post('/incompleto', obtenerReportesIncompletos)

export default router
