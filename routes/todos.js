const express = require('express')
const router= express.Router()
const Todo = require('../models/todo_schema')
var cors = require('cors');
const jwt = require('jsonwebtoken');




//New approach using Json web token. Let's see if it works

router.post('/login',(req,res,next)=>{
  Todo.findOne({username: req.body.username},(err,user)=>{
    if(err) return res.status(401).json({
      title:'server error',
      error: err
    })
    if(!user){
      return res.status(401).json({
        title:'USER DOES NOT EXIST',
        error:'USER DOES NOT EXIST'
      })
    }
    //if successful login
    let token =jwt.sign({userId: user._id},'secretkey');
    console.log(token)
    return res.status(200).json({
      title:'login success',
      token: token
      
    })
  })
})


//another new approach for todo list

router.get('/usertodos',(req,res,next)=>{
  let token= req.headers.token;
  jwt.verify(token,'secretkey',(err,decoded)=>{
    if(err) return res.status(401).json({
      title:'unauthorized'
    })
    //valid token
    Todo.findOne({_id: decoded.userId},(err,user)=>{
      if(err) return console.log(err)
      console.log(user)
      return res.status(200).json({
        title:'user grabbed',
        user:{
          username:user.username,
          todos:user.todos,
          token:user._id
        }
      })
    })
  })
})

//for posting todos to a particular user
// its working
router.post("/addTodo",(req, res) =>{
  
  Todo.updateOne(
    { _id : req.body._id },
    { $push: { todos: req.body.todos } },
    {safe: true, upsert: true},
    (err, user)=>{
      if (err) {
        return console.log(err)
      } else {
        return res.status(200).json({
          title:'user grabbed',
          user:{
            
            todos:user.todos,
            
          }
        })
           console.log(user.todos);
          // res.json({result});
      }
    }
  );
});





router.get('/user', async (req,res) => {

  try{
    const todos = await Todo.find()
    res.send(todos)

}catch(err){
    res.send('Error '+err)
}
})


// get function where we pass the username at :user and if its found
// then it'll return all the todos of that particular username
// working fine. shows all the todos of the given username
router.get('/user/:user', cors(), function(req, res) {
  var user = req.params.user;
  console.log(req.params)
  Todo.find({
    'username': user,
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
 router.get('/todos/:userid',async(req,res)=>{
    try{
        const todos = await Todo.findById(req.params.userid)
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
        todos: req.body.todos
    })
    try{
        const a1= await todo.save()
        res.json(a1)
    }catch(err){
        res.send("ERROR"+ err)
    }
})

router.delete('/:user/:todo',(req,res)=>{
  
  const deleted = Todo.findByIdAndUpdate(
    {_id:req.params.user},
    {
      $pull:{
        todos:{
          _id: req.params.todo
        }
      },
    
      new: true
    },
    function(err, deleted) {
      if (err) {
        res.send(err);
      } else {
          console.log(req.params.user);
          console.log(deleted);
          res.json({deleted});
      }
    }
    )
})


// routes for updating and deleting a todo will be added soon.


module.exports = router