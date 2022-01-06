const nodemailer = require('nodemailer')
const config = require('../config')

exports.nodeMailerOptions = {
  msgSignup: {
    to: '',
    from: config.env.MAIL_FROM,
    subject: 'SubApp.it: Pagamento avvenuto con successo!',
    html: 'Gentile cliente,<br/><br/>'
        + 'Pagamento avvenuto con successo! Entro 24h il tuo account sarà attivo<br/>'
        + '<br/>Distinti Saluti,<br/>'
        + '<span style="color:#29ABF4">Subapp.it</span>'
  },
  reminderMsg: {
    to: 'info@subapp.it', // Change to your recipient,
    from: config.env.MAIL_FROM, // Change to your verified sender
    subject: 'SubApp.it: Nuovo utente registrato',
    html: 'Gentile Antonio,<br/><br/>'
        + 'nuovo utente registrato: '
  },
  forgottenPasswordMsg: {
    to: '', // Change to your recipient,
    from: config.env.MAIL_FROM, // Change to your verified sender
    subject: 'SubApp.it: Nuovo utente registrato!',
    html: 'Gentile cliente,<br/><br/>'
        + 'per completare il reimposta password, acceda al link di seguito riportato<br/>'
  },
  rdoOfInterestMsg: {
    to: '', // Change to your recipient,
    from: config.env.MAIL_FROM, // Change to your verified sender
    subject: 'SubApp.it: è stata caricata rdo di tuo interesse',
    html: 'Gentile cliente,<br/><br/>'
        + 'le informiamo che è stata caricata una RDO potenzialmente di Suo interesse.<br/>'
        + 'La invitiamo a consultare il suo account.<br/>'
        + 'Acceda alla bacheca cliccando su: <a target="_blank" href="www.subapp.it">Subapp.it</a><br/>'
        + '<br/>Distinti Saluti,<br/>'
        + '<span style="color:#29ABF4">Subapp.it s.r.l.s</span>'
  }
}

exports.smtpTransport = nodemailer.createTransport({
  host: 'pro.eu.turbo-smtp.com',
  secure: true,
  debug: true,
  logger: true,
  port: 465,
  auth: {
    user: config.env.MAIL_FROM,
    pass: config.env.MAIL_PSW
  },
  tls: {
    minVersion: 'TLSv1',
    ciphers: 'HIGH:MEDIUM:!aNULL:!eNULL:@STRENGTH:!DH:!kEDH'
  }
})
