import { redirect } from "next/navigation";
import { fetchDataRegister, getSession, login, logout } from "../../../lib";
import styles from './register.module.css'
import axios from "axios";

export default async function Page() {
  const session = await getSession();
  return (
    <div className={styles.register}>
      <div className= {styles.registerBox}>
        <p className={styles.registerText}>Register</p>
      <section>
      <form
        action={async (formData) => {
          "use server";
          let formDetails = await fetchDataRegister(formData);
          console.log(formDetails)
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
        <input className={styles.emailBox} type="email" name="email" placeholder="Email" required/>
        <input className={styles.nameBox} type="name" name="name" placeholder="Name" required/>
        <input className={styles.passwordBox} type="password" name="password" placeholder="Password" required/>
        <br />
        <div className={styles.registerButtonContainer}>
        <button className = {styles.registerButton} type="submit">Register</button>
        </div>
        <p className={styles.loginText}>Already have an account? <a href="/login">Login</a></p>
      </form>
      {/* <form
        action={async () => {
          "use server";
          await logout();
          redirect("/login");
        }}
      >
        <button className = {styles.submitButton} type="submit">Logout</button>
      </form> */}
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
    </section>
      </div>
    </div>
  );
}
