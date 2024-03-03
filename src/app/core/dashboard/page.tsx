import { GetSession, SessionData } from "@/utils/sessionManager";

export default async function Page() {
  const session: SessionData = await GetSession();

  async function Logout() {
    "use server";
    console.log("siamo di qua");
    const res = await fetch(`${process.env.URL}/api/auth`, {
      method: "DELETE"
    });
    const json = await res.json();

    if (json.success == false) {
      console.log(json.error);
    }
  }

  return (
    <div>
      <h1>Dashboard Page!</h1>
      <button type="button" onClick={Logout}>
        Logout
      </button>
    </div>
  );
}
