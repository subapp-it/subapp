/* eslint-disable */
const User = require('../../models/user')
const { clearFile } = require('../../utils/utils')
const Rdo = require('../../models/rdo')
const Availment = require('../../models/availment')
const AWS = require('aws-sdk')
const config = require('../../config')

const s3 = new AWS.S3({
  accessKeyId: config.env.AWS_ID,
  secretAccessKey: config.env.AWS_SECRET,
  signatureVersion: 'v4',
  region: 'eu-west-2'
})

const update = (req, res, next, loggedIn) => {
  const { userId } = req.params
  if(req.body) {
    const today =  new Date()
    today.setHours(0,0,0,0)
    req.body.hasFileExpired = today >  req.body.certificateDate || today >  req.body.durcRegolarityDate
    if(!req.body.blocked) {
      req.body.blocked = today >  req.body.certificateDate || today >  req.body.durcRegolarityDate
    }
    if(today > req.body.certificateDate) {
      req.body.filesExpired.push('Certificato o Visura Camerale')
    } else {
      if(req.body.filesExpired.length > 0) {
        if(req.body.filesExpired.includes('Certificato o Visura Camerale')) {
          const indexToRemove = req.body.filesExpired.indexOf('Certificato o Visura Camerale')
          req.body.filesExpired.splice(indexToRemove,1)
        }
      }
    }
    if(today >req.body.durcRegolarityDate) {
      req.body.filesExpired.push('Regolarità Durc')
    } else {
      if(req.body.filesExpired.length > 0) {
        if(req.body.filesExpired.includes('Regolarità Durc')) {
          const indexToRemove = req.body.filesExpired.indexOf('Regolarità Durc')
          req.body.filesExpired.splice(indexToRemove,1)
        }
      }
    }
  }
  User.findByIdAndUpdate(userId, req.body, {
    overwrite: false,
    new: true
  }).select(['-payed', '-admin'])
    .then((user) => {
      res.status(200).json({ user, message: loggedIn ? 'Utente aggiornato con successo!' : undefined })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const clearAllFile = async (user) => {
  if (user.soaFile) {
    await clearFile(user.soaFile.Key)
  }
  if (user.isoFile) {
    await clearFile(user.isoFile.Key)
  }
  if (user.fgasFile) {
    await clearFile(user.fgasFile.Key)
  }
  if (user.antimafiaFile) {
    await clearFile(user.antimafiaFile.Key)
  }
  if (user.lendingFile) {
    await clearFile(user.lendingFile.Key)
  }
  if (user.certificateFile) {
    await clearFile(user.certificateFile.Key)
  }
  if (user.durcRegolarityFile) {
    await clearFile(user.durcRegolarityFile.Key)
  }
  if(user.loadedRdos.length > 0) {
    for(let rdo of user.loadedRdos) {
      for (let cmeFile of rdo.cmeFiles ) {
        await clearFile(cmeFile.Key)
      }
      for (let image of  rdo.images ) {
        await clearFile(image.Key)
      }
      for (let technicalFile of rdo.technicalFiles ) {
        await clearFile(technicalFile.Key)
      }
    }
  }
}

exports.updateRegisteringUser = (req, res, next) => {
  update(req, res, next, false)
}

exports.updateLoggedUser = (req, res, next) => {
  update(req, res, next, true)
}

exports.fetchUser = (req, res, next) => {
  const { userId } = req.params
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Sessione scaduta')
        error.statusCode = 401
        throw error
      }
      if(!user.admin) {
        const today =  new Date()
        today.setHours(0,0,0,0)
        console.log(today)
        user.hasFileExpired = today >  user.certificateDate || today >  user.durcRegolarityDate
        user.blocked = today >  user.certificateDate || today >  user.durcRegolarityDate
        if(today > user.certificateDate) {
          user.filesExpired.push('Certificato o Visura Camerale')
        } else {
          if(user.filesExpired.length > 0) {
            if(user.filesExpired.includes('Certificato o Visura Camerale')) {
              const indexToRemove = user.filesExpired.indexOf('Certificato o Visura Camerale')
              user.filesExpired.splice(indexToRemove,1)
            }
          }
        }
        if(today >user.durcRegolarityDate) {
          user.filesExpired.push('Regolarità Durc')
        } else {
          if(user.filesExpired.length > 0) {
            if(user.filesExpired.includes('Regolarità Durc')) {
              const indexToRemove = user.filesExpired.indexOf('Regolarità Durc')
              user.filesExpired.splice(indexToRemove,1)
            }

          }
        }
      }
      res.status(200).json({ user })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.fetchUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({ users })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.deleteUser = async (req, res, next) => {
  try {
    const { param } = req.params
    let user = undefined
    if(!param.includes("@")) {
      user = await User.findById(param)
    } else {
      let result = await User.find({username: param})
      user = result[0]
    }
    if (!user) {
      const error = new Error('Impossibile trovare l\'utente.')
      error.statusCode = 404
      throw error
    }
    clearAllFile(user)
    let idList = user.loadedRdos.map((rdo) => rdo._id)
    await Rdo.deleteMany({
      '_id': {$in: idList}
    })
    idList = user.loadedAvailments.map((availment) => availment._id)
    await Availment.deleteMany({
      '_id': {$in: idList}
    })
    if(!param.includes("@")) {
      await User.findByIdAndRemove(param)
    } else {
      await User.findOneAndDelete({username:param})
    }
    res.status(200).json({ message: 'Utente eliminato con successo!' })
  } catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteUserFiles = (req, res, next) => {
  const { userId } = req.params
  const { body } = req
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error('Impossibile trovare l\'utente.')
        error.statusCode = 404
        throw error
      }
      body.forEach((filePath) => {
        clearFile(filePath)
      })
      res.status(200).json({})
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getFile = async (req, res, next) => {
  const { fileId } = req.params
   const url = await s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileId
  })
  if(!url){
    const error = new Error('Impossibile trovare il file.')
    error.statusCode = 500
    throw error
  }
  res.status(200).json({url})
}
