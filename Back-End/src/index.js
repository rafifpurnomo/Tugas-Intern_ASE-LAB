require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const cors = require('cors')
const app = express();
const usersRoute = require('./routes/mahasiswa');
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin')

app.use(cors());
app.use(express.json());
app.use('/mahasiswa', usersRoute);
app.use('/auth', authRoute);
app.use('/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})