require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors')
const app = express();
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth')

app.use(cors());
app.use(express.json());
app.use('/users', usersRoute);
app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})