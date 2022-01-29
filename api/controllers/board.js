/* eslint-disable eqeqeq,no-underscore-dangle,prefer-const,no-restricted-syntax,no-await-in-loop,no-unused-expressions,no-sequences,max-len,no-param-reassign,no-lonely-if,guard-for-in */
const Rdo = require('../../models/rdo')
const Availment = require('../../models/availment')
const Contract = require('../../models/contract')
const User = require('../../models/user')
const { clearFile } = require('../../utils/utils')
const nodeMailer = require('../../utils/nodeMailer')

const removeRdo = async (rdoId, userId) => {
  let indexToRemove
  const rdo = await Rdo.findById(rdoId)
  if (!rdo) {
    const error = new Error('Rdo non trovata')
    error.statusCode = 500
    throw error
  }
  rdo.cmeFiles.forEach((cmeFile) => {
    clearFile(cmeFile.Key)
  })
  rdo.images.forEach((image) => {
    clearFile(image.Key)
  })
  rdo.technicalFiles.forEach((techFile) => {
    clearFile(techFile.Key)
  })
  await Rdo.findByIdAndRemove(rdoId)
  const user = await User.findById(userId)
  if (!user) {
    const error = new Error('Sessione scaduta')
    error.statusCode = 401
    throw error
  }
  user.loadedRdos.forEach((loadedRdo, index) => {
    if (loadedRdo._id.toString() === rdoId.toString()) {
      indexToRemove = index
    }
  })
  if (indexToRemove != null) {
    user.loadedRdos.splice(indexToRemove, 1)
  }
  await user.save()
}

const removeAvailment = async (availmentId, userId) => {
  let indexToRemove
  const availment = await Availment.findById(availmentId)
  if (!availment) {
    const error = new Error('Avvalimento non trovato')
    error.statusCode = 500
    throw error
  }
  if(availment.soaFile) {
    await clearFile(availment.soaFile.Key)
  }
  await Availment.findByIdAndRemove(availmentId)
  const user = await User.findById(userId)
  if (!user) {
    const error = new Error('Sessione scaduta')
    error.statusCode = 401
    throw error
  }
  user.loadedAvailments.forEach((loadedAvailment, index) => {
    if (loadedAvailment._id.toString() === availmentId.toString()) {
      indexToRemove = index
    }
  })
  if (indexToRemove != null) {
    user.loadedAvailments.splice(indexToRemove, 1)
  }
  await user.save()
}

const removeContract = async (contractId) => {
  const contract = await Contract.findById(contractId)
  if (!contract) {
    const error = new Error('Appalto non trovato')
    error.statusCode = 500
    throw error
  }
  await Contract.findByIdAndRemove(contractId)
}

const deleteExpiredRDO = async (next) => {
  try {
    const rdos = await Rdo.find({ expirationDate: { $lt: new Date() } })
    if (rdos.length > 0) {
      console.log('RDO scadute: ', rdos.length)
      for (let rdo of rdos) {
        console.log(`Rimuovendo rdoId ${rdo._id} dello userId: ${rdo.user._id}`)
        await removeRdo(rdo._id, rdo.user._id)
      }
    } else {
      console.log('Nessuna RDO scaduta.')
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.findFilteredRdos = async (req, res, next) => {
  const allFilteredRdo = []
  const queryFirst = {
    'regionOfInterest._id': req.query.regionOfInterestIdFirst,
    'rdos._id': req.query.rdoIdFirst,
    import: req.query.importsFirst
  }
  const querySecond = {}
  const queryThird = {}
  const querySecondNeedeed = req.query.regionOfInterestIdSecond != null
  if (querySecondNeedeed) {
    querySecond['regionOfInterest._id'] = req.query.regionOfInterestIdSecond,
    querySecond['rdos._id'] = req.query.rdoIdSecond,
    querySecond.import = req.query.importsSecond
  }
  const queryThirdNeedeed = req.query.regionOfInterestIdThird != null
  if (queryThirdNeedeed) {
    queryThird['regionOfInterest._id'] = req.query.regionOfInterestIdThird,
    queryThird['rdos._id'] = req.query.rdoIdThird,
    queryThird.import = req.query.importsThird
  }
  await deleteExpiredRDO(next)
  try {
    const rdosFirst = await Rdo.find(queryFirst).sort('createdAt')
    rdosFirst.forEach((rdo) => {
      allFilteredRdo.push(rdo)
    })
    if (querySecondNeedeed) {
      const rdosSecond = await Rdo.find(querySecond).sort('createdAt')
      rdosSecond.forEach((rdo) => {
        allFilteredRdo.push(rdo)
      })
    }
    if (queryThirdNeedeed) {
      const rdosThird = await Rdo.find(queryThird).sort('createdAt')
      rdosThird.forEach((rdo) => {
        allFilteredRdo.push(rdo)
      })
    }
    res.status(200).json({ rdos: allFilteredRdo.flat() })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.findAllRdos = async (req, res, next) => {
  await deleteExpiredRDO(next)
  Rdo.find().sort('createdAt')
    .then((rdos) => {
      res.status(200).json({
        rdos
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.findAllAvailments = async (req, res, next) => {
  Availment.find().sort('createdAt')
      .then((availments) => {
        res.status(200).json({
          availments
        })
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
      })
}

exports.findAllContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.find().sort('createdAt')
    res.status(200).json({
      contracts
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.findOneContract = async (req, res, next) => {
  try {
    const { contractId } = req.params
    const contract = await Contract.findById(contractId)
    res.status(200).json({
      contract
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.findOneRdo = (req, res, next) => {
  const { rdoId } = req.params
  Rdo.findById(rdoId)
    .then((rdo) => {
      res.status(200).json({
        rdo
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.findOneAvailment = (req, res, next) => {
  const { availmentId } = req.params
  Availment.findById(availmentId)
      .then((availment) => {
        res.status(200).json({
          availment
        })
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
      })
}

exports.insertRdo = async (req, res, next) => {
  try {
    const { body } = req
    const { userId } = req.params
    const rdo = new Rdo(body)
    const rdoUpdated = await rdo.save()
    const user = await User.findById(userId)
    user.loadedRdos.push(rdoUpdated)
    await user.save()
    res.status(200).json({ rdo })
    const rdoToFind = {
      subCategory: rdoUpdated.rdos._id,
      import: rdoUpdated.import,
      regionOfInterest: rdoUpdated.regionOfInterest._id
    }
    let mailingList = []
    const users = await User.find()
    for (let usr of users) {
      let match = false
      if (!usr.admin && usr._id != userId) {
        let { rdos } = usr
        if (rdos != null && rdos.first != null) {
          let matchFirstSubcategories = rdos.first.subCategory.filter((subCat) => subCat._id == rdoToFind.subCategory)
          let matchFirstImports = rdos.first.imports.filter((imp) => imp == rdoToFind.import)
          let matchFirstRegions = rdos.first.regionsOfInterest.filter((region) => region._id == rdoToFind.regionOfInterest)
          if (matchFirstSubcategories.length > 0 && matchFirstImports.length > 0 && matchFirstRegions.length > 0) {
            match = true
          } else {
            // gli if sono annidati in modo da entrarci solo se non è stato ancora trovato un match
            if (rdos != null && rdos.second != null) {
              let matchSecondSubcategories = rdos.second.subCategory.filter((subCat) => subCat._id == rdoToFind.subCategory)
              let matchSecondImports = rdos.second.imports.filter((imp) => imp == rdoToFind.import)
              let matchSecondRegions = rdos.second.regionsOfInterest.filter((region) => region._id == rdoToFind.regionOfInterest)
              if (matchSecondSubcategories.length > 0 && matchSecondImports.length > 0 && matchSecondRegions.length > 0) {
                match = true
              } else if (rdos != null && rdos.third != null) {
                let matchThirdSubcategories = rdos.third.subCategory.filter((subCat) => subCat._id == rdoToFind.subCategory)
                let matchThirdImports = rdos.third.imports.filter((imp) => imp == rdoToFind.import)
                let matchThirdRegions = rdos.third.regionsOfInterest.filter((region) => region._id == rdoToFind.regionOfInterest)
                if (matchThirdSubcategories.length > 0 && matchThirdImports.length > 0 && matchThirdRegions.length > 0) {
                  match = true
                }
              }
            }
          }
        }
        if (match) mailingList.push(usr.username)
      }
    }
    for (let recipient of mailingList) {
      nodeMailer.nodeMailerOptions.rdoOfInterestMsg.to = recipient
      await nodeMailer.smtpTransport.sendMail(nodeMailer.nodeMailerOptions.rdoOfInterestMsg, (error, info) => {
        if (error) {
          console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
      })
    }

    console.log('Mail da inviare:', mailingList.length)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.insertAvailment = async (req, res, next) => {
  try {
    const { body } = req
    const { userId } = req.params
    const availment = new Availment(body)
    const availmentUpdated = await availment.save()
    const user = await User.findById(userId)
    user.loadedAvailments.push(availmentUpdated)
    await user.save()
    res.status(200).json({ availment })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.insertContract = async (req, res, next) => {
  try {
    const { body } = req
    const contract = new Contract(body)
    await contract.save()
    res.status(200).json({ contract })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.updateRdo = (req, res, next) => {
  const { rdoId } = req.params
  const { userId } = req.params
  let findedRdo
  let indexToUpdate
  Rdo.findByIdAndUpdate(rdoId, req.body, {
    overwrite: false,
    new: true
  })
    .then((rdo) => {
      findedRdo = rdo
      return User.findById(userId)
    })
    .then((user) => {
      if (!user) {
        const error = new Error('Sessione scaduta')
        error.statusCode = 401
        throw error
      }
      user.loadedRdos.forEach((loadedRdo, index) => {
        if (loadedRdo._id.toString() === rdoId.toString()) {
          indexToUpdate = index
        }
      })
      if (indexToUpdate != null) {
        user.loadedRdos.splice(indexToUpdate, 1)
        user.loadedRdos.push(findedRdo)
      }

      return user.save()
    })
    .then(() => {
      res.status(200).json({})
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.updateAvailment = (req, res, next) => {
  const { availmentId } = req.params
  const { userId } = req.params
  let findedAvailment
  let indexToUpdate
  Availment.findByIdAndUpdate(availmentId, req.body, {
    overwrite: false,
    new: true
  })
      .then((availment) => {
        findedAvailment = availment
        return User.findById(userId)
      })
      .then((user) => {
        if (!user) {
          const error = new Error('Sessione scaduta')
          error.statusCode = 401
          throw error
        }
        user.loadedAvailments.forEach((loadedAvailment, index) => {
          if (loadedAvailment._id.toString() === availmentId.toString()) {
            indexToUpdate = index
          }
        })
        if (indexToUpdate != null) {
          user.loadedAvailments.splice(indexToUpdate, 1)
          user.loadedAvailments.push(findedAvailment)
        }

        return user.save()
      })
      .then(() => {
        res.status(200).json({})
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
      })
}

exports.updateContract = async (req, res, next) => {
  try {
    const { contractId } = req.params
    await Contract.findByIdAndUpdate(contractId, req.body, {
      overwrite: false,
      new: true
    })
    res.status(200).json({})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteRdo = async (req, res, next) => {
  const { rdoId } = req.params
  const { userId } = req.params
  try {
    await removeRdo(rdoId, userId)
    res.status(200).json({ message: 'Rdo eliminata con successo!' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteAvailment = async (req, res, next) => {
  const { availmentId } = req.params
  const { userId } = req.params
  try {
    await removeAvailment(availmentId, userId)
    res.status(200).json({ message: 'Avvalimento eliminato con successo!' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.deleteContract = async (req, res, next) => {
  const { contractId } = req.params
  try {
    await removeContract(contractId)
    res.status(200).json({ message: 'Appalto eliminato con successo!' })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
