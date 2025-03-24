import type { Claims } from "@repo/database";
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

const sendEmail = async (claim: Claims) => {
	const emailParams: MailOptions = {
		from: `"Stack Orange" <orange-pill@mail.stackorange.com>`,
		to: claim.receiver,
		subject: `${claim.sender || "Someone"} sent you bitcoin!`,
		html: `
			<!doctype html>
			<html>
			<body>
				<div
				style='background-color:#EDF1F4;color:#f8fafc;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
				>
				<table
					align="center"
					width="100%"
					style="margin:0 auto;max-width:600px;background-color:#131620;border-radius:0"
					role="presentation"
					cellspacing="0"
					cellpadding="0"
					border="0"
				>
					<tbody>
					<tr style="width:100%">
						<td>
						<h1
							style="font-weight:bold;text-align:center;margin:0;font-size:32px;padding:24px 24px 0px 24px"
						>
							${claim.sender || "Someone"} sent you some bitcoin!
						</h1>
						<div
							style="font-size:48px;font-weight:bold;text-align:center;padding:16px 24px 0px 24px"
						>
							${claim.receiverSatsAmount.toLocaleString("en-US")} sats
						</div>
						<div
							style="font-size:16px;font-weight:bold;text-align:center;padding:0px 24px 16px 24px"
						>
							are ready to be claimed
						</div>
						${
							claim.message
								? `
						<div style="font-size:16px;font-weight:normal;text-align:center;padding:16px 24px 16px 24px">
							"${claim.message}"
						</div>
							`
								: ""
						}
						<div style="text-align:center;padding:16px 24px 24px 24px">
							<a
							ses:no-track
							href="https://stackorange.com/claim?id=${claim.id}"
							style="color:#f8fafc;font-size:16px;font-weight:bold;background-color:#f7931a;border-radius:4px;display:inline-block;padding:12px 20px;text-decoration:none"
							target="_blank"
							><span
								><!--[if mso
								]><i
									style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30"
									hidden
									>&nbsp;</i
								><!
								[endif]--></span
							><span>Claim your bitcoin →</span
							><span
								><!--[if mso
								]><i
									style="letter-spacing: 20px;mso-font-width:-100%"
									hidden
									>&nbsp;</i
								><!
								[endif]--></span
							></a
							>
						</div>
						<div
							style="color:#94a3b8;font-size:12px;font-weight:normal;text-align:center;padding:24px 24px 24px 24px"
						>
							© 2025 Stack Orange
						</div>
						</td>
					</tr>
					</tbody>
				</table>
				</div>
			</body>
			</html>
		`,
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
