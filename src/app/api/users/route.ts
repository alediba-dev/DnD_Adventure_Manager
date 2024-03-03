import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";

export async function GET(request: Request) {
  const dbConnection = await dbConnect();
  const collectionName = "Users";
  try {
    const users = await dbConnection.collection(collectionName).find({}).toArray();
    if (!users) {
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

/**
 * Funzione per il salvataggio di un utente all'interno del db
 */
export async function POST(request: NextRequest) {
  const dbConnection = await dbConnect();
  const collectionName = "Users";
  try {
    //Recupero il json della richiesta inviata dall'utente al server
    const req = await request.json();

    //Recupero gli utenti presenti nel db con l'email inserita
    const users = await dbConnection.collection(collectionName).find({ email: req.email }).toArray();

    //Caso in cui non sia restituita nemmeno la lista di utenti
    if (!users) {
      return NextResponse.json({ success: false });
    }

    //Caso in cui è già presente un utente con l'email inserita
    if (users.length > 0) {
      return NextResponse.json({ success: false, message: "Esiste già un utente con questa email" });
    }

    req.password = await bcrypt.hash(req.password, 10);
    //Se non è presente un utente con l'email inserita, procedo con l'inserimento dell'utente nel db
    const insertResult = await dbConnection.collection(collectionName).insertOne({
      email: req.email,
      password: req.password,
      name: req.name,
      surname: req.surname
    });

    return NextResponse.json({ success: true, _id: insertResult.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Errore nel catch: " + error });
  }
}
