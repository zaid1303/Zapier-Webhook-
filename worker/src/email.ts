
import nodemailer from "nodemailer";
// SOL_PRIVATE_KEY=""
// SMTP_USERNAME=""
// SMTP_PASSWORD=""
// SMTP_ENDPOINT

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: "qktm uugz nvcj nqxm",
  },
});

export async function sendEmail(to: string, body: string) {
  console.log("hi there")
  await transport.sendMail({
    from: "zaidkh1303@gmail.com",
    to,
    subject: "Hello from Zapier",
    text: body
  })
}