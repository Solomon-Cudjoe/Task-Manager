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

const getTimeLeft = (task) => {
  const now = new Date();
  const dueDate = new Date(task.dueDate);
  const timeRemaining = dueDate - now; 

  const hours = Math.floor((timeRemaining % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeRemaining % (1000 * 3600)) / (1000 * 60));

  return `${hours} hour(s) and ${minutes} minute(s)`;
}

const sendEmail = async (user, notification, task) => {
  const uri = `${process.env.FRONTEND_URL}`;
  
  const timeRemainingString = getTimeLeft(task);

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: notification.title,
    html: `<h1>Notification Due</h1>
        <p>Your task, ${task.title}, is due in ${timeRemainingString}.</p>
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
        const timeRemainingString = getTimeLeft(task);
        const notification = new Notification({
          userId: task.userId,
          message: "Your task " + task.title + " is due in " + timeRemainingString,
          title: "Due Task"
        });
        task.notified = true; 
        const user = await User.findOne({ _id: task.userId });
        if (user) { 
          await sendEmail(user, notification, task); 
        }
        await notification.save(); 
        await task.save();
      }
    }
  });
};
