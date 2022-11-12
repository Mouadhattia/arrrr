import nodemailer from "nodemailer";
import User from "../models/userModel.js";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "attiamou3adh@gmail.com",
    pass: "kxvudrlknawswnga",
  },
});

export function sendEmail(to, subject, html) {
  const mailOptions = {
    from: "attiamou3adh@gmail.com",
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

export const buildOrderCreatedEmailForUser = () => ``;
export const buildOrderCreatedEmailForAdmin = () => ``;
export const buildOrderAcceptedEmail = () => ``;
export const buildOrderRejectedEmail = () => ``;

export async function getAdminsEmails() {}

setTimeout(async () => {
  const admin = await getAdminsEmails();
}, 3000);
