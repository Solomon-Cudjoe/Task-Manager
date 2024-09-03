const { getNotifitcations } = require('../Controllers/notication');

const router = require('express').Router();


router.get('/:userId', getNotifitcations);


module.exports  = router