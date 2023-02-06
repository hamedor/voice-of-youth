import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import ValidationErrors from "../validationErrors";

import styles from "../../styles/components/signIn.module.css";
import { useState } from "react";
import Notification from "../notification";

export default function ModalSignIn({ csrfToken, setHaveAccount }) {
  const router = useRouter();

  const [error, setError] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (result.ok) {
      router.back();
      document.body.style.overflow = "auto";
      return;
    }
    //alert("Credential is not valid");
    setError({ message: "Credential is not valid" });
  };

  return (
    <section className={styles.signIn}>
      <div className={styles.warnContainer}>
        {error ? <ValidationErrors error={error.message} /> : null}
      </div>
      <h2 className={styles.title}>Войти</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="email">
          Электронная почта:
        </label>
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          required
        />
        <label className={styles.label} htmlFor="password">
          Пароль:
        </label>
        <input
          className={styles.input}
          required
          id="password"
          name="password"
          type="password"
        />
        <button className={styles.button}>Войти</button>
      </form>

      <div className={styles.line}>
        <p className={styles.text}>Нет аккаунта?</p>{" "}
        <button
          className={styles.linkBtn}
          onClick={() => setHaveAccount(false)}
        >
          Зарегистрироваться
        </button>
      </div>
    </section>
  );
}
