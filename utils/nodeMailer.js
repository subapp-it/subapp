const nodemailer = require('nodemailer')
const config = require('../config')

exports.nodeMailerOptions = {
  msgSignup: {
    to: '',
    from: config.env.MAIL_FROM,
    subject: 'SubApp.it: Pagamento con Bonifico Bancario',
    html: 'Gentile cliente,<br/><br/>'
        + 'per completare l\'acquisto da lei richiesto, esegua un bonifico bancario alle coordinate di seguito riportate.<br/>'
        + 'Coordinate bancarie:<br/>'
        + 'Intestato: <strong>SUBAPP.IT S.R.L.S.</strong><br/>'
        + 'BANCA MONTE DEI PASCHI DI SIENA<br/>'
        + 'IBAN: <strong>IT21J0103088600000001704443</strong><br/><br/>'
        + '<strong>ABBONAMENTO ANNUALE</strong><br/>'
        + 'CAUSALE: Abbonamento per n.1 anno al portale<br/>'
        + 'Importo: <strong>€ 170,80</strong><br/>'
        + '<br/><br/>'
        + '<strong>ABBONAMENTO BIENNALE</strong><br/>'
        + 'CAUSALE: Abbonamento per n.2 anni al portale<br/>'
        + 'Importo: <strong>€ 305,00</strong><br/><br/>'
        + 'L’accesso al portale e la fattura saranno disponibili dopo la conferma dell\'avvenuta contabilizzazione del bonifico sul conto di <span style="color:#29ABF4">Subapp.it s.r.l.s</span><br/>'
        + '<br/>Distinti Saluti,<br/>'
        + '<span style="color:#29ABF4">Subapp.it s.r.l.s</span>'
  },
  forgottenPasswordMsg: {
    to: '', // Change to your recipient,
    from: config.env.MAIL_FROM, // Change to your verified sender
    subject: 'SubApp.it: Reimposta password',
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
  host: 'smtps.aruba.it',
  secure: true,
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
