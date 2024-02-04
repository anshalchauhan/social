// Path module provides utilities for working with file and directory paths
const path = require("path");

// Library to help send out emails from server easily
const nodemailer = require("nodemailer");

//reference the plugin
const hbs = require("nodemailer-express-handlebars");

const sendEmail = async (options) => {
  // 1> Create a transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // Sender gmail address
      pass: process.env.APP_PASSWORD, // App password from Gmail account
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(`${__dirname}/../view/${options.emailType}`),
      defaultLayout: false,
    },
    viewPath: path.resolve(`${__dirname}/../views/${options.emailType}`),
    extName: ".handlebars",
  };

  //attach the plugin to the nodemailer transporter
  transporter.use("compile", hbs(handlebarOptions));

  // 2> Define the email options
  const mailOptions = {
    from: {
      name: "Social",
      address: process.env.EMAIL,
    }, // Sender Address
    to: options.email,
    subject: options.subject,
    template: options.emailType,
    context: {
      name: options.message.name,
      otp: options.message.otp,
      link: options.message.link,
    },
    attachments: options.attachments,
  };

  // 3> Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
