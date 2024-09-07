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