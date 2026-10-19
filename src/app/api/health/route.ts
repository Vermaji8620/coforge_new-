import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";

export async function GET() {
  try {
    const conn = await dbConnect();
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    const status = states[conn.connection.readyState] || "unknown";

    return NextResponse.json(
      {
        status: "ok",
        database: {
          connected: conn.connection.readyState === 1,
          state: status,
          host: conn.connection.host || null,
          name: conn.connection.name || null,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
