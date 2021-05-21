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
        + 'INTESA SAN PAOLO - <strong>_______________________</strong><br/>'
        + 'IBAN: <strong>_____________________________________</strong><br/><br/>'
        + '<strong>ABBONAMENTO ANNUALE</strong><br/>'
        + 'Descrizione: Accesso al portale per la durata di un anno<br/>'
        + 'Importo: <strong>€ 170,00</strong><br/>'
        + 'Intestato a: <span style="color:#29ABF4">Subapp.it s.r.l.s</span>'
        + '<br/><br/>'
        + '<strong>ABBONAMENTO BIENNALE</strong><br/>'
        + 'Descrizione: Accesso al portale per la durata di due anni<br/>'
        + 'Importo: <strong>€ 305,00</strong><br/>'
        + 'Intestato a: <span style="color:#29ABF4">Subapp.it s.r.l.s</span><br/><br/>'
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
    subject: 'SubApp.it: è stata caricata una nuova rdo',
    html: 'Gentile cliente,<br/><br/>'
        + 'è stata caricata una nuova rdo in linea con le sue preferenze.<br/>'
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
