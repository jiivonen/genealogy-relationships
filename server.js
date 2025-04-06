import express from 'express';
import session from 'express-session';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

import dbconfig from './dbconfig.json' with { type: 'json' };

const pool = mysql.createPool(dbconfig);

const port = 3000;
const host = 'localhost';
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'this is a super secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};


app.get('/', requireLogin, (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let connection;
  try {
    connection = await pool.getConnection();
    const SQL = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await connection.execute(SQL, [username]);

    if (rows.length > 0) {
      const match = await bcrypt.compare(password, rows[0].password);
      if (!match) {
        return res.render('login', { error: 'Invalid username or password' });
      }
      req.session.user = { username };
      res.redirect('/');
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'An error occurred. Please try again.' });
  } finally {
    if (connection) connection.release();
  }
});

app.listen(port, host, () => console.log(`Server running at http://${host}:${port}/`));
