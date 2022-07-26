import nodemailer from 'nodemailer';
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const init = () => {
  const oauth2Client = new OAuth2(
    process.env.MAIL_CLIENT_ID,
    process.env.MAIL_CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.MAIL_REFRESH_TOKEN
  });

  return oauth2Client;
};

const sendEmail = async (adminEmail, user) => {

    const mailOptions = {
      from: adminEmail,
      to: adminEmail,
      subject: 'New user request',
      text: `A new user request to access CRM
        Name: ${user.firstName} ${user.lastName}
        email: ${user.email}
        permission: ${user.permission}
      `
    };

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME, 
          clientId: process.env.MAIL_CLIENT_ID,
          clientSecret: process.env.MAIL_CLIENT_SECRET,
          refreshToken: process.env.MAIL_REFRESH_TOKEN,
          accessToken: init().getAccessToken()
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    try {
      smtpTransport.sendMail(mailOptions, (error, response) => {
        return (error) ? { status: false } : { status: true }
      });
    } catch (err) {
      console.log(err);
    } finally {
      smtpTransport.close();
    };
};

module.exports ={
  sendEmail
}