import express from 'express'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import rutasEmpleados from './routes/empleados.js'
import rutasSupervisores from './routes/supervisores.js'

import favicon from 'serve-favicon'

dotenv.config()
const port = process.env.PORT | 4000

const app = express()
app.use(express.json())
app.use(favicon('favicon.ico'))

//Rutas
app.use('/api/empleados', rutasEmpleados)
app.use('/api/supervisores', rutasSupervisores)
//Middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(port, console.log(`El Servidor abierto en el puerto ${port}`))
