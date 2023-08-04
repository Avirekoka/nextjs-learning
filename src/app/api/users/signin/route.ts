import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

export const POST = async (request: NextRequest, response: NextResponse) => {
    try {
        console.log("Inside")
        const requestBody = await request.json();

        const { email, password } = requestBody;
        console.log("email, password : ", email, password);
        if (!email || !password) { 
            return NextResponse.json({ error: "Please provide a valid email and password", staus: 400 });
        };

        console.log("email, password : ", email, password);

        const user = await User.findOne({ email: email });

        //Check if user exists or not
        if (!user) {
            return NextResponse.json({ error: "User not found", status: 404 });
        }

        //Check for the valid password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) { 
            return NextResponse.json({error: "Invalid password", status: 400});
        }

        //Create a token data 
        const tokenData = {
            id: user._id,
            userName: user.userName,
            email: user.email
        };

        //create JWT token
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, { expiresIn: "1h" });

        const response = NextResponse.json({ message: "Login successful", status: 200, success: true });

        //set the token in cookies
        response.cookies.set("token", token, { httpOnly: true });

        return NextResponse.json({ message: "This is my user", response, status: 200 });


    } catch (error: any) {
        console.log(error);
    }
};