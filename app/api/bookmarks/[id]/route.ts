import { db } from "@/firebase.config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();

  const editedData = await updateDoc(doc(db, "bookmarks", params.id), data);

  console.log(editedData);

  return NextResponse.json(editedData);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await deleteDoc(doc(db, "bookmarks", params.id));

  return NextResponse.json(params.id);
}
