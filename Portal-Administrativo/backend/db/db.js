import knex from 'knex'
import { staging } from './knexfile.js'

//Objeto de conexion con la base de datos
export const db = knex(staging)
