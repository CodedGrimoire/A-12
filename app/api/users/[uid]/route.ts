import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models/User";

type Params = {
  params: Promise<{ uid: string }>;
};

export async function GET(_: Request, { params }: Params) {
  try {
    const { uid } = await params;
    await connectDB();
    const user = await UserModel.findOne({ uid }).lean();
    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Fetch user failed", error);
    return NextResponse.json({ error: "Failed to load user" }, { status: 500 });
  }
}
