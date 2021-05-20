/* eslint-disable no-param-reassign,no-underscore-dangle */
const nodemailer = require('../../utils/nodeMailer')

exports.send = async (req, res, next) => {
  const email = req.body
  await nodemailer.smtpTransport.sendMail(email, (error, info) => {
    if (error) {
      if (!error.statusCode) {
        error.statusCode = 500
      }
      next(error)
    }
    res.status(200).json({ message: 'Email inviata con successo. Ti risponderemo al più presto!' })
  })
}
