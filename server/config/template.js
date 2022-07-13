exports.resetEmail = (host, resetToken) => {
  return {
    subject: 'Reset Password',
    text:
        `${
            'You are receiving this because you have requested to reset your password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'
        }${host}/reset-password/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };
};

exports.confirmResetPasswordEmail = () => {
  return {
    subject: 'Password Changed',
    text:
        `You are receiving this email because you changed your password. \n\n` +
        `If you did not request this change, please contact us immediately.`
  };
};

exports.merchantSignup = (host, { resetToken, email }) => {
  return {
    subject: 'Merchant Registration',
    text: `${
        'Congratulations! Your application has been accepted. Please complete your Merchant account signup by clicking on the link below. \n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://'
    }${host}/merchant-signup/${resetToken}?email=${email}\n\n`
  };
};

exports.merchantWelcome = name => {
  return {
    subject: 'Merchant Registration',
    text:
        `Hi ${name}! Congratulations! Your application for merchant account has been accepted. \n\n` +
        `It looks like you already have a member account with us. Please sign in with your member credentials and you will be able to see your merchant account.`
  };
};

exports.signupEmail = name => {
  return {
    subject: 'Account Registration',
    text: `Hi ${name}! Thank you for creating an account with us!.`
  };
};

exports.newsletterSubscriptionEmail = () => {
  return {
    subject: 'Newsletter Subscription',
    text:
        `You are receiving this email because you subscribed to our newsletter. \n\n` +
        `If you did not request this change, please contact us immediately.`
  };
};

exports.contactEmail = () => {
  return {
    subject: 'Contact Us',
    text: `We received your message! Our team will contact you soon. \n\n`
  };
};

exports.merchantApplicationEmail = () => {
  return {
    subject: 'Sell on MERN Store',
    text: `We received your request! Our team will contact you soon. \n\n`
  };
};

exports.orderConfirmationEmail = order => {
  return {
    subject: `Order Confirmation ${order._id}`,
    text:
        `Hi ${order.user.profile.firstName}! Thank you for your order!. \n\n` +
        `We've received your order and will contact you as soon as your package is shipped. \n\n`
  };
};
