import { server } from './server'

import { db } from '../lib/db'

import { config } from 'dotenv'

config()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const port = parseInt(process.env.PORT!) ?? 3000

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
server.listen(port, () => {
  console.log('Server is listening on port', port)
})

db.connect(err => {
  if (err !== null) {
    throw err
  } else {
    console.log('Connected to database')
  }
})
