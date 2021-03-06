const router = require('express').Router();

const homeController = require('./controllers/homeController');

const authController = require('./controllers/authController');
const housingController = require('./controllers/housingController')

router.use(homeController);
router.use('/auth', authController);
router.use('/housings', housingController)


module.exports = router;