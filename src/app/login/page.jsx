import { redirect } from "next/navigation";
import { fetchData, getSession, login, logout } from "../../../lib";
import axios from "axios";

export default async function Page() {
  const session = await getSession();
  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
          let formDetails = await fetchData(formData);
          let dbResponse = await axios.post(
            "http://localhost:4201/api/auth/login",
            formDetails
          );
          console.log(dbResponse.data.message);
          if (dbResponse.data.message.length > 0) {
            console.log("User found");
            await login(dbResponse.data.message[0])
            redirect("/chat");
          } else {
            console.log("User not found");
            redirect("/login");
          }
        }}
      >
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
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
