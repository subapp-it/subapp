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
      res.status(200).json({ user })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.signupPaymentSuccess = async (req, res, next) => {
  const { body } = req
  try {
    nodeMailer.nodeMailerOptions.msgSignup.to = body.username
    await nodeMailer.smtpTransport.sendMail(nodeMailer.nodeMailerOptions.msgSignup, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
    })
    nodeMailer.nodeMailerOptions.reminderMsg.html += body.username
    await nodeMailer.smtpTransport.sendMail(nodeMailer.nodeMailerOptions.reminderMsg, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
    })
    res.status(200).json({})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
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
        res.status(400).json({ message: 'Stiamo valutando la correttezza dei dati inseriti in fasi di registrazione, riprova pi?? tardi.' })
      } else {
        const token = jwt.sign(
          {
            username: loadedUser.username,
            userId: loadedUser._id.toString()
          },
          config.env.accessTokenSecret,
          { expiresIn: '1h' }
        )
        if (!loadedUser.admin) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          loadedUser.hasFileExpired = today > loadedUser.certificateDate || today > loadedUser.durcRegolarityDate
          loadedUser.blocked = today > loadedUser.certificateDate || today > loadedUser.durcRegolarityDate
          if (today > loadedUser.certificateDate) {
            loadedUser.filesExpired.push('Certificato o Visura Camerale')
          } else if (loadedUser.filesExpired.length > 0) {
            if (loadedUser.filesExpired.includes('Certificato o Visura Camerale')) {
              const indexToRemove = loadedUser.filesExpired.indexOf('Certificato o Visura Camerale')
              loadedUser.filesExpired.splice(indexToRemove, 1)
            }
          }
          if (today > loadedUser.durcRegolarityDate) {
            loadedUser.filesExpired.push('Regolarit?? Durc')
          } else if (loadedUser.filesExpired.length > 0) {
            if (loadedUser.filesExpired.includes('Regolarit?? Durc')) {
              const indexToRemove = loadedUser.filesExpired.indexOf('Regolarit?? Durc')
              loadedUser.filesExpired.splice(indexToRemove, 1)
            }
          }
        }
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
        message: 'Ti ?? stata inviata un\' email con le istruzioni da seguire per il reimposta password',
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
