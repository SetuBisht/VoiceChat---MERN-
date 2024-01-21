const crypto = require("crypto");
const hashService = require("./hash-service");
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
console.log(smsSid, smsAuthToken, "smsAuthToken");
const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyLoading: true,
});
const nodemailer = require("nodemailer");
class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your OTP is ${otp}`,
    });
  }

  async sendByEmail(email, otp) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Login Otp",
      text: `This is your OTP ${otp}`,
    };

    return await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

module.exports = new OtpService();
