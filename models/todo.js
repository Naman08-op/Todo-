const { randomUUID } = require('crypto')
const mongoose = require('mongoose')



const todoSchema= new mongoose.Schema({
    "username": {
      "type": "string"
    },
    "todos": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "id": {
              "type": randomUUID
            },
            "todo": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "todo"
          ]
        }
      ]
    }})

module.exports = mongoose.model('Todo',todoSchema)