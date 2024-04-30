const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passport = require('passport');
const usersModel = require('../models/usersModel');

const addUserController = async (req, res, next) => {
    try {
        const { email, password, document_type, document_number, first_name, last_name, cellphone } = req.body;
        
        if (!email || !password) {
            return res.status(400).send('All input is required');
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

        // Preparar los datos del usuario para el modelo
        const userAuthData = {
            document_type, document_number, first_name, last_name, cellphone,
            email: email.toLowerCase(),
            password: hash,
            salt: salt
        };

        // Utilizar el modelo para añadir el usuario
        usersModel.addUserModel(userAuthData, (err, userId) => {
            if (err) {
                console.error('Error adding user:', err);
                return res.status(500).send(err);
            }

            // Usuario insertado con éxito, iniciar sesión
            const newUser = {
                id: userId,
                email: userAuthData.email
            };

            req.login(newUser, function(err) {
                if (err) {
                    console.error('Error during automatic login after registration:', err);
                    return next(err);
                }
                const token = jwt.sign(
                    { user_id: newUser.id, email: newUser.email },
                    process.env.TOKEN_KEY,
                    { expiresIn: '2h' }
                );

                console.log("Token: ", token);
                res.status(201).send({ newUser, token });
            });
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

module.exports = {
    addUserController
};