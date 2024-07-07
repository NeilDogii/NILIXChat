import { redirect } from "next/navigation";
import { fetchDataRegister, getSession, login, logout } from "../../../lib";
import axios from "axios";

export default async function Page() {
  const session = await getSession();
  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
          let formDetails = await fetchDataRegister(formData);
          let dbResponse = await axios.post(
            "http://localhost:4201/api/auth/register",
            formDetails
          );
          console.log(dbResponse.data.message);
          if (dbResponse.data.message == "found") {
            console.log("User already exists");
            redirect("/register");
          } else {
            console.log("User registered");
            console.log(dbResponse.data.message[0])
            await login(dbResponse.data.message[0])
            redirect("/chat");
          }
        }}
      >
        <input type="email" name="email" placeholder="Email" />
        <input type="name" name="name" placeholder="Name" />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button type="submit">Register</button>
      </form>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/login");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
