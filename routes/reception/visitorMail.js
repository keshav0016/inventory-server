const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')

/**
 * @description: Send mail api for sending mail to the employee on the arrival of the visitor.
 * @param {String} employeeEmail 
 * @param {String} visitorName 
 */
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