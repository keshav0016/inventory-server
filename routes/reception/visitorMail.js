const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')

const sendMail = async (employeeEmail, visitorName) => {
    try {
        const msg = {
            from: 'hr@westagilelabs.com',
            to: employeeEmail,
            subject: 'Your visitor has arrived.',
            html:`<p>Dear employee, your visitor ${visitorName} has arrived, 
            and is waiting at the reception. </p>`
        };
        await sgMail.send(msg);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = sendMail;