const { getNotifitcations, readNotifications, deleteNotification, deleteAllNotifications } = require('../Controllers/notication');

const router = require('express').Router();

router.get('/:userId', getNotifitcations);
router.put('/read/:userId/:notificationId', readNotifications);
router.delete('/:userId/:notificationId', deleteNotification);
router.delete('/:userId', deleteAllNotifications);

module.exports  = router