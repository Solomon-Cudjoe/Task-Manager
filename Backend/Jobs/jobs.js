const scheduler = require("node-schedule");
const Notification = require("../Models/notification");
const Task = require("../Models/task");
const nodemailer = require('nodemailer');
const User = require("../Models/auth");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (user, notification, task) => {
  const uri = `${process.env.FRONTEND_URL}`;
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: notification.title,
    html: `<h1>Notification Due</h1>
        <p>Your task, ${task.title} is due tomorrow</p>
        <a href="${uri}">Check it out</a>
        `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email", err);
  }
};

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

    if (tasks.length) {
      for (const task of tasks) {
        const notification = new Notification({
          userId: task.userId,
          message: "Your task " + task.title + " is due in 24 hours",
          title: "Due Task"
        });
        await notification.save(); 

        task.notified = true;
        await task.save(); 
          const user = await User.findOne({ _id: task.userId });
        if (user) { 
          await sendEmail(user, notification, task); 
        }
      }
    }
  });
};
