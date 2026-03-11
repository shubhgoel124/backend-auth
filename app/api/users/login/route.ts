import { connectToDatabase} from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDatabase();

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json();
        const { email, password } = reqbody;
        console.log(reqbody);

        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        const tokendata = {
            id : existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
        };
        const token = await jwt.sign(tokendata, process.env.JWT_SECRET!);

        const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

        // Set the JWT token in a cookie
        response.cookies.set("token", token, { httpOnly: true, path: "/" });

        return response;
    }
    catch (error) {
        console.error("Error during user login:", error);   
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}