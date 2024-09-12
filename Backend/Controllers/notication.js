const Notification = require("../Models/notification");

exports.getNotifitcations = async (req, res) => {
    const { userId } = req.params;
    const notifications = await Notification.find({userId});
    if (!notifications) {
        return res.status(200).json({
            notications: {},
            message: "No notifications available"
        })
    }
    return res.status(200).json({
        notifications,
        message: "No notifications available"
    })
}

exports.readNotifications = async (req, res) => {
    const { userId, notificationId } = req.params;
    try {
        const notification = await Notification.find({ userId, _id: notificationId });
        if (!notification) {
            return res.status(404).json({ error: 'Not found' });
        }
        notification.status = 'read';
        await notification.save();
        return res.status(200).json({message: 'Success'})
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}