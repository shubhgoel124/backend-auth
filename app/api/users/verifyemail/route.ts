import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { token } = reqbody;

        const user = await User.findOne({ verifytoken: token, verifytokenexpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        user.isverified = true;
        user.verifytoken = undefined;
        user.verifytokenexpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error verifying email:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}   
