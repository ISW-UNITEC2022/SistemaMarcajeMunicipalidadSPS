import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT | 4000

const app = express()
app.use(express.json())

app.listen(port, console.log(`El Servidor abierto en el puerto ${port}`))
