import express from 'express'

import cookieParser from 'cookie-parser'

import { pass } from '../lib/pass'

import cors from 'cors'

import { config } from 'dotenv'

import morgan from 'morgan'

import session from 'express-session'

import { type NodeEnv } from '../lib/types'

import { join } from 'node:path'

const app = express()

const secret = process.env.SESSION_SECRET ?? 'secret'

const nodeEnv: NodeEnv = process.env.NODE_ENV ?? 'prod'

config()

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.use(session({
  secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3.6 * Math.pow(10, 6)
  }
}))

app.use(pass.initialize())

app.use(pass.session())

app.use(cors())

if (nodeEnv === 'dev') {
  app.use(morgan('dev'))
}

app.set('views', join(process.cwd(), 'views'))

app.set('view engine', 'ejs')

app.use('/resources', express.static(join(process.cwd(), 'public')))

export { app }
