import express from 'express'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import rutasEmpleados from './routes/empleados.js'

dotenv.config()
const port = process.env.PORT | 4000

const app = express()
app.use(express.json())

//Rutas
app.use('/api/empleados', rutasEmpleados)

//Middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(port, console.log(`El Servidor abierto en el puerto ${port}`))
