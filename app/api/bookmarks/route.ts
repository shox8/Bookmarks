import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("");
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  return NextResponse.json("");
}
