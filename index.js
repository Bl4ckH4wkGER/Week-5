const server = require("./server");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/week5', {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true
}).then(() => {
  server.listen(port, () => {
   console.log(`Server is listening on http://localhost:${port}`);
  //  console.log(`JWT Secret is ${process.env.JWT_SECRET}`)
  });
});