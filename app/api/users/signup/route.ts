import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectToDatabase();

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json();
        const { username, email, password } = reqbody;
        console.log(reqbody);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        await sendEmail({ email, emailtype: "verify", userid: newUser._id });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}
catch (error) {
    console.error("Error during user signup:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
}