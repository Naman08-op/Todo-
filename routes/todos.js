const express = require('express')
const router= express.Router()
const Todo = require('../models/todo')

router.get('/',async(req,res)=>{
    try{
        const todos = await Todo.find()
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


module.exports = router