const express = require('express')
const router= express.Router()
const Todo = require('../models/todo_schema')
var cors = require('cors');


// get function where we pass the username at :user and if its found
// then it'll return all the todos of that particular username
// but this is showing some errors I'm working on resolving those errors. The output is -> []
// not working. errors to be resolved.
router.get('/user/:user', cors(), function(req, res) {
  var user = req.params.user;
  console.log(req.params)
  Todo.find({
    $text: {
        $search: user
    }
}, function(err, result) {
      if (err) throw err;
      if (result) {
        console.log(result)
          res.json(result)
      } else {
          res.send(
              'Error'
          )
      }
  })
})

// router.get('/todo/:user',async(req, res)=> {
//   var user = req.params.user;
// try{const todos = await Todo.find({$text:{$search:user}})
// res.json(todos)
// }catch(err){
//   res.send(err)
// }
// })



// getting all users along with their todos
// its working
router.get('/',async(req,res)=>{
     try{
         const todos = await Todo.find()
         res.json(todos)

     }catch(err){
         res.send('Error '+err)
     }
 })

 // getting todos of a particular user
 // its working
 router.get('/todos/:username',async(req,res)=>{
    try{
        const todos = await Todo.findById(req.params.username)
        res.json(todos)

    }catch(err){
        res.send('Error '+err)
    }
})

// for posting a user along with todos
//its working
router.post('/',async(req,res)=>{
    const todo = new Todo({
        username: req.body.username,
        todos: req.body.todos,
        todo: req.body.todo
    })
    try{
        const a1= await todo.save()
        res.json(a1)
    }catch(err){
        res.send("ERROR"+ err)
    }
})


//for posting todos to a particular user
// its working
    router.route("/todo").post(function(req, res) {
        Todo.updateOne(
          { _id : req.body._id },
          { $push: { todos: req.body.todos } },
          {safe: true, upsert: true},
          function(err, result) {
            if (err) {
              res.send(err);
            } else {
                console.log(req.body);
              res.json(result);
            }
          }
        );
      });

// routes for updating and deleting a todo will be added soon.


module.exports = router