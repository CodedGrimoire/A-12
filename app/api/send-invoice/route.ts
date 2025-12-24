import { NextResponse } from "next/server";


import nodemailer from "nodemailer";

export async function POST(request: Request) 


{
  try 
  
  {
    const body = await request.json();
    const
    
    
    {
      to,
      subject = "Care.xyz Booking Invoice",
      serviceName,
      duration,
      totalCost,
      location,
    } = body;

    if (!to)
      
      
      {
      return NextResponse.json({ error: "Missing recipient email." }, { status: 400 });
    }

    const host = (process.env.SMTP_HOST || process.env.EMAIL_HOST || "").trim();
    const user = (process.env.SMTP_USER || process.env.EMAIL_USER || "").trim();
    const pass = (process.env.SMTP_PASS || process.env.EMAIL_PASS || "").trim();
    const port = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587);
    const from = (process.env.SMTP_FROM || process.env.EMAIL_FROM || user || "").trim();

    const missing: string[] = [];
    if (!host) missing.push("SMTP_HOST");
    if (!user) missing.push("SMTP_USER");
    if (!pass) missing.push("SMTP_PASS");

    if (missing.length) {
      console.error(`Email not sent: missing env vars [${missing.join(", ")}].`);
      return NextResponse.json(
        { error: `Email is not configured. Set ${missing.join(", ")}.` },
        { status: 500 },
      );
    }
    const transporter = nodemailer.createTransport(
      
      
      {
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // Fail fast with a clear error if the SMTP connection cannot be established.
    await transporter.verify();

    const html = `
      <h2>Your Care.xyz Booking</h2>
      <p>Thank you for booking <strong>${serviceName}</strong>.</p>
      <ul>
        <li><strong>Duration:</strong> ${duration}</li>
        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Total Cost:</strong> ৳${totalCost}</li>
        <li><strong>Status:</strong> Pending</li>
      </ul>
      <p>We will confirm availability shortly.</p>
    `;

    const info = await transporter.sendMail(
      
      
      {
      from: from || user,
      to,
      subject,
      html,
    });

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } 
  
  
  catch (error) 
  
  
  
  {
   // console.error("Email send error", error);
    return NextResponse.json(
      { error: "Failed to send invoice email. Check server logs for details." },
      { status: 500 },
    );
  }
}
