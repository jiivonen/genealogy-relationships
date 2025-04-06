import express from 'express';
import session from 'express-session';
import mysql from 'mysql2/promise';

const port = 3000;
const host = 'localhost';
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

});

app.listen(port, host, () => console.log(`Server running at http://${host}:${port}/`));
