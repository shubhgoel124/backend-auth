import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const ispublicpath = ["/login", "/signup", "/verifyemail", "/forgotpassword", "/resetpassword"].includes(path);
    const token = request.cookies.get('token')?.value;

    if (!token && !ispublicpath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && ispublicpath) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/login", "/signup", "/verifyemail", "/forgotpassword", "/resetpassword"],
};


