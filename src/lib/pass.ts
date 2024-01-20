import passport from 'passport'

import { Strategy } from 'passport-local'

import { compare } from 'bcrypt'

import { db } from './db'

import { type RowDataPacket } from 'mysql2'

const pass = passport

pass.use(new Strategy((email, password, done) => {
  db.query<RowDataPacket[0]>('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err !== null) {
      done(true, false, {
        message: 'Query error'
      })
      console.error(err)

      return
    }

    if (row.length <= 0) {
      done(null, false, {
        message: 'User doesnt exists'
      })

      return
    }

    if (!(await compare(password, row[0].password as string))) {
      done(null, false, {
        message: 'User doesnt exists'
      })

      return
    }

    done(null, row[0].id as Express.User)
  })
}))

pass.serializeUser((user, done) => {
  done(null, user)
})

pass.deserializeUser((id, done) => {
  db.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err !== null) {
      done(err, false)
      console.error(err)

      return
    }

    if (row.length <= 0) {
      done(null, false)
    }

    const user = row[0]

    done(null, user as Express.User)
  })
})

export { pass }
