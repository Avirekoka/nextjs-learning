import { databaseConnection } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

databaseConnection();

export const POST = async (request: NextRequest) => {
    try {

        const requestBody = await request.json();
        const { userName, email, password } = requestBody;

        console.log(userName, email, password);
        //Check for the missing parameters
        if (!userName || !email || !password) {
            return NextResponse.json({ error: 'Please fill all the required fields', status: 400 });
        };

        //Check for the user already exists
        const user = await User.findOne({$or: [{ email: email }, {userName: userName }]});

        if (user) {
            return NextResponse.json({ error: 'User already exists', status: 409 });
        };

        // const saltRounds = 10;

        // bcrypt.hash(password, saltRounds, async function (err: any, hash: any) {
            
        //     if (err) {
        //         return NextResponse.json({ error: 'Error while encrypting password', status: 500 });
        //     }

        //     await User.create({ email, password: hash, userName });
        //     return NextResponse.json({ message: 'User created successfully', status: 200 });
        // });

        // hash password
        const generateSalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, generateSalt);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            userName
        });

        //Create a token data 
        const tokenData = {
            id: newUser._id,
            userName: newUser.userName,
            email: newUser.email
        };
        console.log(tokenData);

        //create JWT token
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, { expiresIn: "1h" });

        const response = NextResponse.json({ message: "User created successfully", status: 201, success: true });

        //set the token in cookies
        response.cookies.set("token", token, { httpOnly: true });

        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message, status: 500 });
        
    }
};

export const GET = (request: NextRequest, response: NextResponse) => {
    console.log("Inside")
    return NextResponse.json({ message: 'User created successfully', status: 200 });
}