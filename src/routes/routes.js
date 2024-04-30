const { Router } = require('express');
const router = Router();
const cors = require('cors');
const corsOptions = require('../helpers/cors');
const userController = require('../controllers/usersController');
const wardianRoute = require('../middlewares/authMiddleware')


// Route information to connect to API
router.get('/', (req, res) => {
    res.render('index', { csrfToken: req.csrfToken() });  // Asegúrate de que index.ejs esté en tu directorio de vistas
});

router.get('/register', (req, res) => {
    res.render('register', { csrfToken: req.csrfToken() }); // Asegúrate de que index.ejs esté en tu directorio de vistas
});

router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        console.log('i come back...')
        res.redirect('/');
    }
    console.log('success dashboard')
    res.render('dashboard', { csrfToken: req.csrfToken() }); 
})

module.exports = router;