import nodemailer from 'nodemailer'
import {envar} from "../config/envar";
import template from "../config/template";
import {
    confirmResetPasswordEmail,
    forgetPasswordEmail,
    accountVerificationEmail,
    accountVerificationSuccessEmail
} from "../config/mail-template";

class MailService {
    init() {
        try {
            return nodemailer.createTransport({
                    host: envar.mail.SMTP_HOST,
                    port: envar.mail.SMTP_PORT,
                    secure: false,
                    auth: {
                        user: envar.mail.SMTP_AUTH_USER,
                        pass: envar.mail.SMTP_AUTH_PASS
                    },
                    logger: true,
                    transactionLog: true, // include SMTP traffic in the logs
                    allowInternalNetworkInterfaces: false
                }
            );
        } catch (error) {
            console.warn('Something wrong with mail service');
        }
    }
}

const mailService = new MailService().init();

export const testEmail = async () => {
    let transporter = nodemailer.createTransport({
            host: envar.mail.SMTP_HOST,
            port: envar.mail.SMTP_PORT,
            secure: false,
            auth: {
                user: envar.mail.SMTP_AUTH_USER,
                pass: envar.mail.SMTP_AUTH_PASS
            },
            logger: true,
            // transactionLog: true, // include SMTP traffic in the logs
            allowInternalNetworkInterfaces: false
        }
    )

    console.log("SMPT HOST", envar.mail.SMTP_HOST)
    // verify connection, just once to check email server
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
}


export const sendEmail = async (email, type, host, data) => {
    try {
        const message = prepareTemplate(type, host, data);

        const config = {
            from: `Gabung Kelas <${envar.mail.SMTP_AUTH_USER}>`,
            to: email,
            subject: message.subject,
            text: message.text
        };

        return await mailService.sendMail(config)
    } catch (error) {
        return error;
    }

}

const prepareTemplate = (type, host, data) => {
    let message;

    switch (type) {
        case 'reset':
            message = template.resetEmail(host, data);
            break;

        case 'reset-confirmation':
            message = confirmResetPasswordEmail(data);
            break;

        case 'signup':
            message = template.signupEmail(data);
            break;

        case 'merchant-signup':
            message = template.merchantSignup(host, data);
            break;

        case 'merchant-welcome':
            message = template.merchantWelcome(data);
            break;

        case 'newsletter-subscription':
            message = template.newsletterSubscriptionEmail();
            break;

        case 'contact':
            message = template.contactEmail();
            break;

        case 'merchant-application':
            message = template.merchantApplicationEmail();
            break;

        case 'order-confirmation':
            message = template.orderConfirmationEmail(data);
            break;

        case 'forgot-password':
            message = forgetPasswordEmail(data);
            break;

        case 'account-verification':
            message = accountVerificationEmail(data);
            break;

        case 'account-verification-success':
            message = accountVerificationSuccessEmail(data);
            break;

        default:
            message = '';
    }

    return message;
};
