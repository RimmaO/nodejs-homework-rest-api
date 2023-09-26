const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "rimma_o@meta.ua",
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "kefivo4238@cdeter.com",
//   from: "rimma_o@meta.ua",
//   subject: "Test",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

const sendEmail = async (data) => {
  const email = { ...data, from: "rimma_o@meta.ua" };
  await transport
    .sendMail(email)
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
  return true;
};

module.exports = sendEmail;
