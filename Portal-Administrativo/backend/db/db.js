import knex from 'knex'
import { staging } from './knexfile.js'

export const db = knex(staging)
