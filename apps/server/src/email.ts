import nodemailer from "nodemailer";
import type { MailOptions } from "nodemailer/lib/sendmail-transport";

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
	const emailParams: MailOptions = {
		from: `"Stack Orange" <orange-pill@mail.stackorange.com>`,
		to: recipientEmail,
		subject: "Hello via SMTP",
		text: "This is a test email sent using SMTP.",
		html: "<h1>Hello</h1><p>This is a test email.</p>",
	};

	if (process.env.NODE_ENV !== "production") {
		console.log("Not running prod, logging email params");
		console.log("Email params: ", emailParams);

		return;
	}

	const info = await transporter.sendMail(emailParams);

	console.log("Email sent: ", info.messageId);
};

export { sendEmail };
