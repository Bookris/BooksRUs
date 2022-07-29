const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/assets/style.css')));
// app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});