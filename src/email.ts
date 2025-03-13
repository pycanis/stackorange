import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

type SendEmailParams = {
  recipientEmail: string;
};

const sendEmail = async ({ recipientEmail }: SendEmailParams) => {
  const info = await transporter.sendMail({
    from: `"Stack Orange" <orange-pill@mail.stackorange.com>`,
    to: recipientEmail,
    subject: "Hello via SMTP",
    text: "This is a test email sent using SMTP.",
    html: "<h1>Hello</h1><p>This is a test email.</p>",
  });

  console.log("Email sent: ", info.messageId);
};

export { sendEmail };
