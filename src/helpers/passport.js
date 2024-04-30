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

passport.use(new LocalStrategy(async (email, password, done) => {
    debug('passport: ', email);
    console.log('user: ', email, " pass: ", password)
    try {
        const [rows] = await db.query('SELECT * FROM auth WHERE email = ? LIMIT 1', [email]);

        if(rows.length === 0){
            return done(null, false, { message: 'Usuario no encontrado.' });
        }

        const user = rows[0];
        if(user.password !== password){
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }
        console.log('estoy aqui', user)
        return done(null, user);
    }catch (error) {
        console.log('error: ', error)
        return done(error);   
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await db.query('SELECT * FROM auth WHERE id = ?', [id]);
    
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