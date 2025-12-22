import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      to,
      subject = "Care.xyz Booking Invoice",
      serviceName,
      duration,
      totalCost,
      location,
    } = body;

    if (!to) {
      return NextResponse.json({ error: "Missing recipient email." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email send error", error);
    return NextResponse.json({ error: "Failed to send invoice email." }, { status: 500 });
  }
}
