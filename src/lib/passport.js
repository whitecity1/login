const { use } = require('passport');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
     const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
     if (rows.length > 0) {
        const user = rows[0];
       const validPassword = await helpers.matchPassword(password, user.password);
       if(validPassword) {
        done(null, user, req.flash('success', 'Welcome ' + user.username));
       } else {
        done(null, false, req.flash('message', 'Incorrect password '));
       }
     } else {
        return done(null, false, req.flash('message', 'The username does not exists '));
     }
    // console.log(req.body)
    // console.log(username)
    // console.log(password)
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { nombres, apellidos, documento, municipio, direccion, profesion} = req.body;
    const newUser = {
        username,
        password,
        nombres,
        apellidos,
        documento,
        direccion,
        municipio, 
        profesion
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
    // console.log(result); Para 2 ensayo
    // console.log(req.body);Para 1 ensayo
}));

passport.serializeUser((usr, done) => {
    done(null, usr.id);
});

passport.deserializeUser(async (id, done) => {
     const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows [0]);
});


//Método de autenticación
// passport.use('local.signin', new Localtrategy({

// }));

