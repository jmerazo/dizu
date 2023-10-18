const { Router } = require('express');
const router = Router();
const cors = require('cors');
const corsOptions = require('../helpers/cors');

// Route information to connect to API
router.get('/', cors(corsOptions), (req, res) => 
    {res.status(200).json({message: 'Connect to our API DIZU'})}
)

module.exports = router;