/* eslint-disable no-param-reassign,no-underscore-dangle,max-len */
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const nodeMailer = require('../../utils/nodeMailer')
const User = require('../../models/user')

exports.signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error()
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const { body } = req
  bcrypt
    .hash(body.password, 12)
    .then((hashedPw) => {
      body.password = hashedPw
      const user = new User(body)
      return user.save()
    })
    .then(async (user) => {
      user.payed = undefined
      user.admin = undefined
      nodeMailer.nodeMailerOptions.msgSignup.to = user.username
      await nodeMailer.smtpTransport.sendMail(nodeMailer.nodeMailerOptions.msgSignup, (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
      })
      res.status(200).json({ user })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.login = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validazione fallita.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const { username } = req.body
  const { password } = req.body
  let loadedUser
  let payed
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        const error = new Error('Username non valido!')
        error.statusCode = 401
        throw error
      }
      payed = user.payed
      if (user.username !== 'admin@admin.com') {
        user.payed = undefined
        user.admin = undefined
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Password non valida!')
        error.statusCode = 401
        throw error
      }
      if (!payed) {
        res.status(400).json({ message: 'Registrazione non ancora completata! Controlla l\' e-mail ed esegui gli ultimi passi per completare la registrazione.' })
      } else {
        const token = jwt.sign(
          {
            username: loadedUser.username,
            userId: loadedUser._id.toString()
          },
          config.env.accessTokenSecret,
          { expiresIn: '1h' }
        )
        res.status(200).json({ token, user: loadedUser, message: 'Login avvenuto con successo!' })
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
exports.forgottenPassword = (req, res, next) => {
  const { email } = req.query
  let findedUser
  User.findOne({ username: email })
    .then((user) => {
      if (!user) {
        const error = new Error('Email non registrata!')
        error.statusCode = 401
        throw error
      }
      findedUser = user
      nodeMailer.nodeMailerOptions.forgottenPasswordMsg.html += `https://www.subapp.it/forgotPassword/${user._id}`
      nodeMailer.nodeMailerOptions.forgottenPasswordMsg.to = user.username
      console.log(nodeMailer.nodeMailerOptions.forgottenPasswordMsg.html)
      return nodeMailer.smtpTransport.sendMail(nodeMailer.nodeMailerOptions.forgottenPasswordMsg)
    })
    .then(() => {
      res.status(200).json({
        message: 'Ti è stata inviata un\' email con le istruzioni da seguire per il reimposta password',
        user: findedUser._id
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.resetPassword = (req, res, next) => {
  const { id } = req.body
  const { password } = req.body
  let findedUser = {}
  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        const error = new Error('Utente non trovato!')
        error.statusCode = 401
        throw error
      }
      findedUser = user
      return bcrypt.hash(password, 12)
    })
    .then((hashedPw) => {
      findedUser.password = hashedPw
      return findedUser.save()
    })
    .then(() => {
      res.status(200).json({ message: 'Reset password avvenuto con successo!' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
