require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const usersRoute = require('./routes/users');

app.use(express.json());
app.use('/users', usersRoute);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})