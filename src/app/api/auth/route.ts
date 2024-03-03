import { User } from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { DestroySession } from "@/utils/sessionManager";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

/**
 * Funzione per la gestione della login di un utente
 */
export async function POST(request: NextRequest) {
  const dbConnection = await dbConnect();
  const collectionName = "Users";
  try {
    const req = await request.json();
    const user = await dbConnection.collection<User>(collectionName).findOne({ email: req.email });
    if (!user) {
      return NextResponse.json({ success: false, error: "errore" });
    }

    if (user.password != null) {
      const passwordEquality = await bcrypt.compare(req.password, user.password);
      if (!passwordEquality) return NextResponse.json({ success: false, error: "Le password non coincidono" });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await DestroySession();
    return NextResponse.redirect("http://localhost:3000/auth/login");
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
