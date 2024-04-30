const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var db = require('../db/conn_db');

passport.use(new LocalStrategy({
        usernameField: 'email', // especifica que el "username" es el "email"
        passwordField: 'password'
    }, async (email, password, done) => {
    console.log('email: ', email, ' password: ', password)
    try {
        const rows = await queryDatabase(email);

        if (rows.length === 0) {
            return done(null, false, { message: 'Usuario no encontrado.' });
        }

        const user = rows[0];
        const storedSaltHex = user.salt; // Convierte la sal almacenada a una cadena
        const storedPasswordHex = user.password; // Convierte la contraseña almacenada a una cadena

        /* console.log('user: ', user)  */       
        console.log('storePasswordHead: ', storedPasswordHex)        
        console.log('storedSaltHex: ', storedSaltHex)

        // Derivar la contraseña y compararla
        const isValidPassword = await verifyPassword(password, storedSaltHex, storedPasswordHex);
        console.log('isValidPassword', isValidPassword)

        if (isValidPassword) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }
    } catch (error) {
        return done(error);
    }
}));

async function verifyPassword(inputPassword, storedSalt, storedPassword) {
    const hashedPassword = await hashPassword(inputPassword, storedSalt);

    if (hashedPassword === storedPassword) {
        return true; // Contraseña válida
    } else {
        return false; // Contraseña incorrecta
    }
}
  
async function hashPassword(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
            reject(err);
        } else {
            resolve(derivedKey.toString('hex'));
        }
        });
    });
}

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, email: user.email });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

async function queryDatabase(email) {
    try {
        const [rows] = await db.execute('SELECT * FROM auth WHERE email = ?', [email]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = passport;