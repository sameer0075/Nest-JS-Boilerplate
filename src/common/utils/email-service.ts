export function emailService(mailservice, name, email) {
  mailservice
    .sendMail({
      to: email, // list of receivers
      from: process.env.EMAIL_USERNAME, // sender address
      subject: 'Sign Up EMail ✔', // Subject line
      html: ``, // HTML body content
    })
    .then((success) => {
      console.log('success email', success);
    })
    .catch((err) => {
      console.log('err email', err);
    });
}
