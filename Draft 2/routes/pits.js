const validator = require('./validation')
const mongodb = require('mongodb')
const coll = 'dev'

module.exports = {

    getPits(req, res) {
      if (req.params.pitId === undefined){
        req.db.collection(coll).find({}, {sort: {_id: -1}})
        .toArray((error, pits) => {
          if (error) return next(error)
        console.log('\nGet All Pits with ' + pits.length + ' records in memory.')
        return res.status(200).send(pits)
      })} else { 
        req.db.collection(coll)
        .find({_id: mongodb.ObjectID(req.params.pitId)}, {sort: {_id: -1}})
        .toArray((error, pits) => {
          if (error) return next(error)
          if (pits.length >=1){
        console.log('\nGet Specific Pit with ' + pits.length + ' records in memory.')
        return res.status(200).send(pits)}
      else {
        console.log('\nGet Specific Pit Failed, Showing All Pits with ' + pits.length + ' records in memory.')
        res.status(400).send('Pit ID not found, showing all pits in record: ' + JSON.stringify(pits))}      
            })
        }
  },

    addPit(req, res) {
      console.log('Payload: ' + JSON.stringify(req.body))
      let safeObj = validator.addPitValidation(JSON.stringify(req.body))
      console.log(safeObj)
      if (safeObj !== null){
        req.db.collection(coll).insert(safeObj, (error, result) => {
          if (error) return process.exit(1)
          console.log('\nValidation passed, post added with ID: ' + safeObj._id)
          //console.log('\nValidation passed, post added.') 
          return res.status(201).send(result.name + ' added with ID# ' + safeObj._id)}
        )}
      else {
        console.log('\nValidation failed, post not added.') 
        res.status(400).send('Supplied post data was not valid, please review and try again.')
    }
  },
    updatePit(req, res) {
      //console.log(req.params.pitId)
      let safeObj = validator.addPitValidation(JSON.stringify(req.body))
      if (safeObj!==null) {
        req.db.collection(coll).update({ _id : mongodb.ObjectID(req.params.pitId) }, safeObj, (error, result) => {
        if (error) return process.exit(1)        
        console.log('Pit records updated via PUT request ' + result.result.nModified +' records updated successfully.')
        return res.status(200).send(result.result.nModified + ' records updated with new data')})
      } else {console.log('\nValidation failed, post not updated.') 
      res.status(400).send('Supplied pit record data was not valid, please review and try again.')
      }
    },
    removePit(req, res) {
      if ((req.params.pitId !== undefined) && (mongodb.ObjectID(req.params.pitId))){
        req.db.collection(coll).remove({ _id : mongodb.ObjectID(req.params.pitId)}, {justOne: true}, (error, result)=>{
          if (error) return process.exit(1)
          console.log(`Removed the document where ID = ${req.params.pitId}`)
          return res.status(200).send(`Success ${result.result.n} documents removed`)}
         )} else {
          res.status(400).send('Supplied pit record ID not valid.  Delete failed.')
      }
    }
  }