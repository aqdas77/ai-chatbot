require('dotenv').config();
const {Chat} = require('./models/chatModel')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db')
const app = express(); 
app.use(cors());
app.use(bodyParser.json());
connection();
const { Configuration, OpenAI } = require('openai');
// const configuration = new Configuration();
const openai = new OpenAI({
        apiKey: process.env.APIKEY,
      });
const PORT = process.env.PORT || 3000; 

  
app.listen(PORT, () =>{ 
        console.log(`Server is listening at PORT : ${PORT}...`) 
}); 
 app.post("/message",async (req,res)=>{
        const { prompt } = req.body;
        try {
          const result =  await openai.completions.create({
            model:"text-davinci-003",
            prompt,
            top_p:1,
            temperature: 0,
            max_tokens: 100,
          });
          const messageChat = new Chat({
            messageType : "message",
            messageData : prompt
          })
          const responseChat = new Chat({
            messageType : "response",
            messageData : result.choices[0].text,
          })
          // await Chat.insertOne(messageChat);
          // await Chat.insertOne(responseChat)
          await messageChat.save();
          await responseChat.save();
          return res.json({ result: result.choices[0].text });
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            return res
              .status(error.response.status)
              .json({ error: error.response.data });
          } else {
            console.log(error.message);
            return res.status(500).json({ error: error.message });
          }
        }
 })


