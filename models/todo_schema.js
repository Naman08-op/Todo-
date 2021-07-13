const mongoose = require('mongoose')
const MUUID = require('uuid-mongodb');
const mUUID1 = MUUID.v1();
var string = mongoose.Types.ObjectId.isValid('')
mongoose.set('useCreateIndex', true);


const todos= new mongoose.Schema({
  todo: String
})

const todoSchema= new mongoose.Schema({
  username:{
    type: String
  },
  todos:[todos]
})

todoSchema.index({ username: 'text' });

module.exports = mongoose.model('Todo',todoSchema)


// const todoSchema= new mongoose.Schema({
//     "username": {
//       "type": "object",
//       "properties":{
//         "type": "string"
//       }
//     },
//     "todos": {
//       "type": "array",
//       "items": [
//         {
//           "type": "object",
//           "properties": {
//             "_id": {
//               "type": "string", default: mUUID
//             },
//             "todo": {
//               "type": "string"
//             }
//           },
//           "required": [
//             "_id",
//             "todo"
//           ]
//         }
//       ]
//     }})

