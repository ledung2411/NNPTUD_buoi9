const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 25,
  secure: false,
  auth: {
    user: "1b413c616f0352",
    pass: "9aa58967f5c12d",
  },
});

module.exports = {
  sendmailFrogetPass: async function (to, URL) {
    return await transporter.sendMail({
      from: `NNPTUD@balabala.com`, // sender address
      to: to, // list of receivers
      subject: "MAIL MOI DU LICH CAM", // Subject line
      html: `<a href=${URL}>CLICK VAO DAY DE XEM VIEC NHE VOLT CAO</a>`, // html body
    });
  },
};
