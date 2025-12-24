import { NextResponse } from "next/server";

import { BookingModel } from "@/lib/models/Booking";

import { connectDB } from "@/lib/db";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(_: Request, { params }: Params) 


{
  try {
    const { id } = await params;
    await connectDB();
    const booking = await BookingModel.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true },
    ).lean();
    if (!booking) 
      
      
      {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ booking });
  }
  
  
  catch (error) 
  
  
  {
 //   console.error("Cancel booking failed", error);
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 });
  }
}
