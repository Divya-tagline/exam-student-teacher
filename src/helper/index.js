import {cron} from ("node-cron");
import {nodemailer } from "nodemailer";
import {config} from "../config"
const transporter = nodemailer.createTransport({
  service: ConfigSet.SERVICE,
  auth: {
    user: confug.USER_NAME,
    pass: config.PASSWORD,
  },
});
const helper = [];
helper.cheackvalue = async function check_value(result, n) {
    let mark = 0;
    for (var i = 0; i < n; i++) {
      var ans = result[i].ans;
     // var y = ;
      await Qustion.findById(result[i].questionId, function (err, responce) {
        if (responce.answer == ans) {
          mark++;
        }
      });
    }
    return mark;
  };

  helper.cron = (email, msg, time) => {
    cron.schedule(time, function () {
      console.log("running a task every 2 hours(1 min)");
      const mailOptions = {
        from: config.USER_NAME,
        to: email,
        subject: "result",
        text: msg,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.status(config.OK_STATUS).json(info);
          console.log("Email sent: " + info.response);
        }
      });
    });
  };

  module.exports = helper;