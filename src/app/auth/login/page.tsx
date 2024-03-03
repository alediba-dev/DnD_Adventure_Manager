import { SaveSession } from "@/utils/sessionManager";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function submitData(event: FormData) {
    "use server";

    const res = await fetch(`${process.env.URL}/api/auth`, {
      method: "POST",
      body: JSON.stringify({ email: event.get("email"), password: event.get("password") })
    });
    const json = await res.json();

    if (json.success == false) {
      console.log(json.error);
    } else {
      await SaveSession(json.data._id);
      redirect("/core/dashboard");
    }
  }

  return (
    <form action={submitData}>
      <input name="email" placeholder="Email" type="email"></input>
      <input name="password" placeholder="Password" type="password"></input>
      <button type="submit">Accedi</button>
    </form>
  );
}
