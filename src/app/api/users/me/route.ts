import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect(); 

export const GET = async (request: NextRequest) => {
  try {
    const userId = getDataFromToken(request); 
    const user = User.findOne({_id: userId}).select("-password"); // by putting a minus sign in front of a selected field, makes it neglectd while querying


    return NextResponse.json({
      message: "User Found", 
      data: user
    })
  } catch (error:any) {
    return NextResponse.json({
      error: error.message 
    }, {status: 500})
  }
}
