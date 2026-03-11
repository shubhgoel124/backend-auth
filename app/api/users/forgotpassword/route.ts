import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email } = reqbody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "No account found with this email" }, { status: 400 });
        }

        await sendEmail({ email, emailtype: "reset", userid: user._id });

        return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
    } catch (error) {
        console.error("Error sending reset email:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
