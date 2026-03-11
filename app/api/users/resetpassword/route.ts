import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { token, password } = reqbody;

        const user = await User.findOne({
            forgotpasswordtoken: token,
            forgotpasswordtokenexpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired reset token" }, { status: 400 });
        }

        user.password = await bcrypt.hash(password, 10);
        user.forgotpasswordtoken = undefined;
        user.forgotpasswordtokenexpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error resetting password:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
