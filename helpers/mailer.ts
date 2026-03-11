import nodemailer from "nodemailer";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailtype, userid }: any) => {
    try {
        const hashedtoken = await bcryptjs.hash(userid.toString(), 10);

        if (emailtype === "verify") {
            await User.findByIdAndUpdate(userid, {
                verifytoken: hashedtoken,
                verifytokenexpiry: Date.now() + 3600000,
            });
        } else if (emailtype === "reset") {
            await User.findByIdAndUpdate(userid, {
                forgotpasswordtoken: hashedtoken,
                forgotpasswordtokenexpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const mailOptions = {
            from: "shubhgoel009@gmail.com",
            to: email,
            subject: emailtype === "verify" ? "Verify your account" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailtype === "verify" ? "verifyemail" : "resetpassword"}?token=${hashedtoken}">here</a> to ${emailtype === "verify" ? "verify your email" : "reset your password"}.</p>`,
        };

        const info = await transport.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


