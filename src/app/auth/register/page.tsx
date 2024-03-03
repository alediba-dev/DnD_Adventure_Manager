import { User } from "@/models/user";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function registerUser(event: FormData) {
    "use server";

    var body: any = {};

    if (event.get("name") != null) {
    }
    const user: User = new User();
    user.name = event.get("name")?.toString();
    user.surname = event.get("surname")?.toString();
    user.email = event.get("email")?.toString();
    user.password = event.get("password")?.toString();

    const res = await fetch(`${process.env.URL}/api/users`, {
      method: "POST",
      body: JSON.stringify(user)
    });
    const json = await res.json();

    if (json.success == false) {
      console.log("ERRORE REGISTRAZIONE UTENTE");
    } else {
      redirect("/auth/login");
    }
  }

  return (
    <form action={registerUser}>
      <input name="name" placeholder="Nome"></input>
      <input name="surname" placeholder="Cognome"></input>

      <input name="email" placeholder="Email" type="email"></input>
      <input name="password" placeholder="Password" type="password"></input>
      <button type="submit">Registrati</button>
    </form>
  );
}
