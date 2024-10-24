
import nodemailer from "nodemailer";
// SOL_PRIVATE_KEY=""
// SMTP_USERNAME=""
// SMTP_PASSWORD=""
// SMTP_ENDPOINT

const transport = nodemailer.createTransport({
    host: process.env.SMTP_ENDPOINT,
    port: 465,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

export async function sendEmail(to: string, body: string) {
  console.log("hi there")
    await transport.sendMail({
        from: "zaidkh1303@gmail.com",
        sender: "zaid.zapier.com",
        to,
        subject: "Hello from Zapier",
        text: body
    })
}