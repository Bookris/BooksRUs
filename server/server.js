const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test server can work
// app.get('/', (req, res) => res.send("i am okayyyyyyy'"))



// load all assets 
app.use(express.static(path.join(__dirname, '../client/assets')));

// load router 
// app.use('/api', apiRouter);


// server message 
app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});