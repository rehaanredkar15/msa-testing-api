const nodemailer = require('nodemailer');
// const postmark = require('postmark');

// Send an email:

const emailConfiguration = (options) => {
  // const client = new postmark.ServerClient('24c181c7-ff0d-4cba-9980-e2558fcffa39');

  // try {
  //   client.sendEmail({
  //     From: 'rehaan.redkar@msasoftware.us',
  //     To: 'rehaanredkar32@gmail.com',
  //     Subject: 'Test',
  //     TextBody: 'Hello from Postmark!',
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return error.message;
  // }

  const transporter = nodemailer.createTransport({

    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = emailConfiguration;
