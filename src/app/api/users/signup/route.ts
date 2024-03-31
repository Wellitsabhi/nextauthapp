import { connect } from '@/dbConfig/dbConfig';
import userSchema from '@/models/userModel';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import {sendEmail} from '@/helpers/mailer'

connect();

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        // validation
        console.log(reqBody);

        const user = await User.findOne({ email })

        // if user already exists
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // if new user, encrypt password   (using bcryptjs)
        const salt = await bcryptjs.genSalt(10);   //generate salt
        const hashedPassword = await  bcryptjs.hash(password, salt)  //hash the password
       
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        // send verification email
        await sendEmail({email, emailType:"VERIFY",userId:savedUser._id})  // "._id" is unique id generated by mongodb
        return NextResponse.json({
            message:"User registered successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}