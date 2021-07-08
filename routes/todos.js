const express = require('express')
const router= express.Router()
const Todo = require('../models/todo_schema')



router.get('/',async(req,res)=>{
     try{
         const todos = await Todo.find()
         res.json(todos)

     }catch(err){
         res.send('Error '+err)
     }
 })

 router.get('/todos/:username',async(req,res)=>{
    try{
        const todos = await Todo.findById(req.params.username)
        res.json(todos)

    }catch(err){
        res.send('Error '+err)
    }
})

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




module.exports = router