import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const sessionOptions = {
  password: "@y2QZ5dm'JV3q5/n?UYR34o£{V6e1i5:",
  cookieName: "DnD_Project_Cookie_Name",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600
  }
};

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
}

export async function GetSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}

export async function SaveSession(_id: string) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.username = _id;
  session.isLoggedIn = true;
  return session.save();
}

export async function DestroySession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.isLoggedIn = false;
  return session.destroy();
}
