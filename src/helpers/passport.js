const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

passport.use(new LocalStrategy(async (login, pass, done) => {
    console.log('user: ', login, " pass: ", pass)
    try {
        const [rows] = await db.query('SELECT * FROM seg_usuarios WHERE login = ? LIMIT 1', [login]);

        if(rows.length === 0){
            return done(null, false, { message: 'Usuario no encontrado.' });
        }

        const user = rows[0];
        if(user.pass !== pass){
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }

        return done(null, user);
    }catch (error) {
        return done(error);   
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.cod_user);
});

passport.deserializeUser(async (cod_user, done) => {
    try {
        const [rows] = await db.query('SELECT * FROM seg_usuarios WHERE cod_user = ?', [cod_user]);
    
        if (rows.length === 0) {
          return done(null, false);
        }
    
        const user = rows[0];
        done(null, user);
      } catch (error) {
        return done(error);
      }
});

module.exports = passport;