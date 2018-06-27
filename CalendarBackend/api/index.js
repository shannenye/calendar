const router = require('express').Router();

// router.use('/user', require('./user'));
router.use('/events', require('./events'));

module.exports = router;