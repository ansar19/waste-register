const functions = require('firebase-functions');

const admin = require('firebase-admin');

const nodemailer = require('nodemailer');

require('dotenv').config();

admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Set up 2LO authentication

// This example uses an existing Access Token. 
// If the token is not accepted or current time is past the expires value, then a new accessToken value is generated using provided service account.

// create reusable transporter object using the default SMTP transport

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'ecomarine.test@gmail.com',
        pass: process.env.CLIENT_ID,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        privateKey: process.env.PRIVATE_KEY,
        accessToken: process.env.ACCESS_TOKEN,
        expires: process.env.EXPIRES,
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    }
});


exports.sendMail = functions.database.ref('/users/{userId}/records/{recordId}').onCreate((snapshot, context) => {

    const val = snapshot.val();

    const {
              params: { recordId }
            } = context

    // getting dest email by query string

    const mailOptions = {
        from: 'ecomarine.test@gmail.com.',  // You can write any mail Adress you want this doesn't effect anything
        to: 'riderland@gmail.com', // This mail adress should be filled with any mail you want to read it
        subject: 'Новая запись', // Sample Subject for you template
        html: `<body style="margin: 0; padding: 0;"> 
            <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                <tr>
                    <td style="padding: 10px 0 30px 0;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                            <tr>
                                <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                <b>Уведомление о новой записи</b>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                                                <b>Код записи: ${recordId}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            <b>Объем отхода: ${val.amount}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                <b>Дата вывоза: ${val.removalDate}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>                
                        </table>
                    </td>
                </tr>
            </table>
        </body>
            ` // email content in HTML. You can write any Html template in here
    };

    return transporter.sendMail(mailOptions)
      .then(() => console.log('Email Sent!'))
      .catch(error => console.error(error))
});
