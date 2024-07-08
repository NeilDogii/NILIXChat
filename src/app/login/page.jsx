import { redirect } from "next/navigation";
import { fetchData, getSession, login, logout } from "../../../lib";
import styles from './login.module.css'
import axios from "axios";

export default async function Page() {
  const session = await getSession();
  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        <p className={styles.loginText}>Login</p>
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
            <input className={styles.emailBox} type="email" name="email" placeholder="Email" required/>
            <input className={styles.passwordBox} type="password" name="password" placeholder="Password" required/>
            <br />
            <div className={styles.loginButtonContainer}>
              <button className={styles.loginButton} type="submit">Login</button>
            </div>
            <p className={styles.registerText}>Don't have an account?<a href="/register"> Register</a></p>
          </form>
          {/* <form
        action={async () => {
          "use server";
          await logout();
          redirect("/login");
        }}
      >
        <button type="submit">Logout</button>
      </form> */}
          {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        </section>
      </div>
    </div>
  );
}
