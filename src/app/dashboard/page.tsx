import {MongoClient} from "mongodb"
export default function Page() {
  async function createData(formData: FormData) {
    "use server"
    const rawFormData = {
      name: formData.get("name")
    }

    if(process.env.NEXT_PUBLIC_MONGODB_URI != null) {
      const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI)
      client.db("DnD_Project")
    }

    console.log(process.env.NEXT_PUBLIC_MONGODB_URI, "asdas")
  }
  
  return (<div>
    <h1>Dashboard Page!</h1>
    <form action={createData}>

    <input name="name"></input>
    <button type="submit">Aggiungi</button>
    </form>
    </div>);
}
