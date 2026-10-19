import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { DocumentModel, IDocumentItem } from "@/models";
import { initialDocuments, seedDatabaseIfConnected } from "@/lib/data-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    await dbConnect();
    await seedDatabaseIfConnected();

    const query = status ? { status: status as IDocumentItem["status"] } : {};
    const docs = await DocumentModel.find(query).lean();
    if (docs && docs.length > 0) {
      return NextResponse.json({ success: true, source: "mongodb", data: docs });
    }
  } catch {
    // Fallback if MongoDB is offline
  }

  return NextResponse.json({ success: true, source: "mock", data: initialDocuments });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    const newDoc = await DocumentModel.create({
      title: body.title || "Uploaded_Document.pdf",
      type: body.type || "Contract",
      fileType: body.fileType || "pdf",
      pages: body.pages || 1,
      fileSize: body.fileSize || "1.2 MB",
      confidence: body.confidence || 98.0,
      status: "Processing",
      workspace: body.workspace || "Legal · Contracts",
      compliancePolicy: body.compliancePolicy || "Commercial contracts v4",
      pipeline: {
        ocr: "running",
        ocrProgress: 35,
        classify: "queued",
        extract: "queued",
        comply: "queued",
      },
    });

    return NextResponse.json({ success: true, data: newDoc }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error creating document";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
