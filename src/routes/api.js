const { Router } = require('express');
const router = Router();
const cors = require('cors');
const corsOptions = require('../helpers/cors');
const userController = require('../controllers/usersController');
const reportsController = require('../controllers/reports');


// Route information to connect to API
router.get('/', cors(corsOptions), (req, res) => 
    {res.status(200).json({message: 'Connect to our API DIZU'})}
)

router.post('/signup', userController.addUserController)
router.get('/report/documentxdependencies', reportsController.reportDocsController)
router.get('/report/docsxdepxfilter', reportsController.reportDocsFilterController)

module.exports = router;