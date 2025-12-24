import { NextResponse } from "next/server";


import { connectDB } from "@/lib/db";

import { getServiceBySlug } from "@/lib/server/services";


 import { BookingModel } from "@/lib/models/Booking";

export async function GET(request: Request)



{
  const { searchParams } = new URL(request.url);



   const userUid = searchParams.get("userUid");

  if (!userUid) 
    
    
    {
    return NextResponse.json({ error: "Missing userUid" }, { status: 400 });
  }


  try 
  
  
  {
    await connectDB();
    const bookings = await BookingModel.find({ userUid })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ bookings });
  } 
  
  
  catch (error) 
  
  
  
  {
   // console.error("Load bookings failed", error);
    return NextResponse.json({ error: "Failed to load bookings" }, 
      
      { status: 500 });


  }
}

export async function POST(request: Request) 


{
  try 
  
  
  {
    const body = await request.json();
    const {
      userUid,
      userEmail,
      serviceId,
      duration,
      location,
    } = body;

    if (!userUid || !userEmail || !serviceId || !duration || !location)
      
      
      
      {
      return NextResponse.json({ error: "Missing booking fields" }, { status: 400 });
    }

    const service = await getServiceBySlug(serviceId);
    if (!service) 
      
      
      {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const rate =
      duration.unit === "hours" ? service.hourlyRate : service.dailyRate;
    const subtotal = rate * duration.value;


     const platformFee = Math.max(5, subtotal * 0.05);
    const totalCost = Math.round((subtotal + platformFee) * 100) / 100;

    await connectDB();


    const booking = await BookingModel.create(
      
      
      
      {
      userUid,
      userEmail,
      serviceId,
      serviceName: service.name,
      duration,
      location,
      totalCost,
      status: "Pending",
    });

    return NextResponse.json({ booking });
  } 
  
  
  catch (error)
  
  
  {
  //  console.error("Create booking failed", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
