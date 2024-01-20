/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as mysql from 'mysql2'

import { config } from 'dotenv'

config()

const host = process.env.DB_HOST ?? 'localhost'

const user = process.env.DB_USER ?? 'root'

const password = process.env.DB_PASSWORD ?? ''

const name = process.env.DB_NAME ?? 'chat_db'

const port = parseInt(process.env.DB_PORT!) ?? 3306

export const db = mysql.createConnection({
  host,
  user,
  password,
  database: name,
  port
})
