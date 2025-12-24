import { NextResponse } from "next/server";

import { UserModel } from "@/lib/models/User";


import { connectDB } from "@/lib/db";

export async function POST(request: Request) 


{
  try 
  
  {
    const body = await request.json();
    const { uid, email, name, contact, nid, photoUrl } = body;


    if (!uid || !email)
      
      
      {
      return NextResponse.json({ error: "Missing uid or email" }, { status: 400 });
    }
    await connectDB();
    const user = await UserModel.findOneAndUpdate(
      { uid },
      { email, name, contact, nid, photoUrl },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    ).lean();
    return NextResponse.json({ user });
  } 
  
  
  catch (error) 
  
  
  {
  //  console.error("User upsert failed", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
