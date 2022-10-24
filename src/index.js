require('dotenv').config();

const express = require('express');
const path = require('path');

var faunadb = require('faunadb');
q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET,
  domain: 'db.us.fauna.com',
  scheme: 'https',
});

port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.post('/mail_registration', async (req, res) => {
  await client
    .query(
      q.Create(q.Collection('mail-list'), {
        data: { mail: req.body.email, suggestion: req.body.text },
      })
    )
    .catch((err) => console.log(err));

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
