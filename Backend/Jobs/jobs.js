const scheduler = require("node-schedule");
const Notification = require("../Models/notification");
const Task = require("../Models/task")

exports.notificationJob = () => {
    scheduler.scheduleJob("* * * * *", async () => {
        const now = new Date();
        const dayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const tasks = await Task.find({
            dueDate: {
                $gte: now,
                $lt: dayLater
            },
            status: "pending",
            notified: false
        });

        if (tasks) {
            for(const task of tasks) {
                const notification = new Notification({
                    userId: task.userId,
                    message: "Your task " + task.title + " is due in 24 hours",
                    title: "Due Task"
                });
                notification.save();

                task.notified = true;
                task.save()
                console.log(notification);
            }
        }        
    })
}