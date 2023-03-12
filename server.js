const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
  },
  // console.log(`Connected to the INSERT database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});