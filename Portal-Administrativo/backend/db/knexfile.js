//Objeto de configuracion para conectar la base de datos
import dotenv from 'dotenv'
dotenv.config()

//Archivo de configuracion para la base de datos
export const staging = {
  client: 'postgresql',
  connection: {
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 20,
  },
}
