const { getNotifitcations, readNotifications } = require('../Controllers/notication');

const router = require('express').Router();


router.get('/:userId', getNotifitcations);
router.put('/read/:userId/:notificationId', readNotifications);


module.exports  = router