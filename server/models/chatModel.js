const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
  messageType : {type:String,required:true},
  messageData : {type:String,required:true},
})

const Chat = mongoose.model("Chat",chatSchema);

module.exports = {Chat};