//const store=require('./data')
const validator=require('./validation')

//toDo design the data.js file to communicate with MongoDB.  Then update below to comply with that.
module.exports = {
  getPitResults(req, res) {
      if ((req.params.postId !== undefined) && (req.params.postId <= (store.posts.length-1))){ 
        console.log('\nGet Comments for Specific Post with ' + store.posts.length + ' post records in memory.')
        return res.status(200).send(store.posts[req.params.postId].comments)
      }else {
        console.log('\nGet Comments for Post Failed, Showing All Posts with ' + store.posts.length + ' records in memory.')
        res.status(400).send('Comment ID not found, showing all posts: ' + JSON.stringify(store.posts))}      
    },
    addPitResult(req, res) {
      let id = req.params.postId
      let safeObj = validator.addCommentValidation(JSON.stringify(req.body))
      if(safeObj !== null){
        store.posts[id].comments.push(safeObj)
        return res.status(201).send(store.posts[id])
      } else {
        console.log('\nValidation failed, comment not added.') 
        res.status(400).send('Supplied post data was not valid, please review and try again.')
      }
    },
    updatePitResult(req, res) {
      let commentId = req.params.commentId
      let postId = req.params.postId
      let safeObj = validator.addCommentValidation(JSON.stringify(req.body))
      if (safeObj !== null){
        Object.assign(store.posts[postId].comments[commentId], safeObj)
        console.log('updated: '+ store.posts[postId].comments[commentId])
        return res.status(200).send('updated: '+ JSON.stringify(store.posts[postId].comments[commentId]))
      } else {
        console.log('\nValidation failed, post not added.') 
        res.status(400).send('Supplied post data was not valid, please review and try again.')
      }
    },
    removePitResult(req, res) {
      let commentId = req.params.commentId
      let postId = req.params.postId
      if ((postId) && (commentId) && (postId <= store.posts.length) && (commentId <= store.posts[postId].comments.length)){
      store.posts[postId].comments.splice(commentId, 1)
      return res.status(200).send('Comments: ' + store.posts[postId].comments)
      } else {
        res.status(400).send('Supplied post and comment ID not valid.  Delete failed.')
      }
    }
  }