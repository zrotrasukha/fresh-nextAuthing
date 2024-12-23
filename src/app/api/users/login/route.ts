import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'; 
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { password, email } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exists",
        },
        { status: 400 }, // 400: represents client error
      );
    }
    
    console.log(" User exists: " , user);
    
    const validPassword = bcrypt.compare(password, user.password); 
    if(!validPassword){
      return NextResponse.json({error: "Invalid passowrd"},{status: 400})
    }

    const tokenData = { 
      id: user._id, 
      username: user.username  , 
      email: user.email
    }

    const token = jwt.sign(tokenData, process.env.SECRET!, {expiresIn: '1h'}); 
    const response = NextResponse.json({
      message: "Login successful", 
      success: true, 
    })

    response.cookies.set("token", token, {
      httpOnly: true // HTTP-only cookies can't be accessed from client-side JavaScript, so third-party scripts and browser extensions won't even know they exist. It is much safer than storing them in localstorage. 

    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }, // unexpected server error that prevented the request from fulfilling
    );
  }
};
