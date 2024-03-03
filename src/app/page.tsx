import Link from "next/link";
import styles from "./page.module.css";
async function getData() {
  const res = await fetch(`${process.env.URL}/api/users`, { method: "GET", cache: "no-cache" });
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <div>
      <Link className={styles.menuLink} href="/core/dashboard">
        Dashboards
      </Link>
      <Link className={styles.menuLink} href="/auth/register">
        Sign up
      </Link>
      <Link className={styles.menuLink} href="/auth/login">
        Sign in
      </Link>
      {data.data.map((d: any) => (
        <div
          key={d._id}
          className="pop-out h-[250px] w-[300px] md:h-[250px] md:w-[400px] lg:h-[250px] lg:w-[400px] border-2 cursor-pointer rounded-md m-auto md:m-auto lg:m-0">
          <h2 className="text-[30px] ml-5 mt-10 text-[gray]">{d.name}</h2>
        </div>
      ))}
    </div>
  );
}
