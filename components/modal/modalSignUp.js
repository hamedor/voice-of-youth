import {  useState } from "react";
import { useRouter } from "next/router";

import {  useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../lib/apollo";

import styles from "../../styles/components/signIn.module.css";
import ValidationErrors from "../validationErrors";
import Notification from "../notification";

export default function ModalSignUp({
  csrfToken,
  setHaveAccount,
  setRegisterSucces,
}) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + "." + dd + "." + yyyy;

  const router = useRouter();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
    date: today,
  });

  //const [err, setErr] = useState(false);
  const [errText, setErrText] = useState("");

  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION, {
    onError: (err) => {},
  });

  if (loading) console.log("Submitting...");

  const handleSubmit = async (e) => {
    e.preventDefault();

    register({
      variables: {
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        date: userData.date,
      },
    });

    if (!error) {
      //router.back();
      setHaveAccount(true);
      setRegisterSucces(true);
      document.body.style.overflow = "auto";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleCheck = (e) => {
    e.preventDefault();

    if (
      (userData.password && e.target.value !== userData.password) ||
      (userData.repeatedPassword &&
        e.target.value !== userData.repeatedPassword)
    ) {
      setPasswordInvalid(true);
    } else {
      setPasswordInvalid(false);
    }
  };
  /*
      useEffect(()=>{
        if(userData.password===userData.repeatedPassword){
            setPasswordInvalid(false)
        }
      },[userData])
      */

  console.log(error);
  return (
    <section className={styles.signIn}>
      <div className={styles.warnContainer}>
        {passwordInvalid ? (
          <Notification text={"Введённые пароли не совпадают!"} />
        ) : null}

        {error ? <ValidationErrors error={error.message} /> : null}
      </div>

      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="email">
          {" "}
          Электронная почта*:{" "}
        </label>

        <input
          className={styles.input}
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          required
        />
        <label className={styles.label} htmlFor="username">
          {" "}
          Никнейм*:{" "}
        </label>

        <input
          className={styles.input}
          type="text"
          name="username"
          onChange={(e) => handleChange(e)}
          required
        />

        <label className={styles.label} htmlFor="firstname">
          {" "}
          Имя*:{" "}
        </label>

        <input
          className={styles.input}
          type="text"
          name="firstName"
          onChange={(e) => handleChange(e)}
          required
        />

        <label className={styles.label} htmlFor="lastname">
          {" "}
          Фамилия:{" "}
        </label>

        <input
          className={styles.input}
          type="text"
          name="lastName"
          onChange={(e) => handleChange(e)}
        />

        <label className={styles.label} htmlFor="password">
          Пароль*:{" "}
        </label>
        <input
          className={`${passwordInvalid ? styles.inputInvalid : styles.input}`}
          type="password"
          name="password"
          onBlur={(e) => {
            handleCheck(e);
          }}
          onChange={(e) => handleChange(e)}
          required
        />

        <label className={styles.label} htmlFor="password">
          Повторите пароль*:{" "}
        </label>
        <input
          className={`${passwordInvalid ? styles.inputInvalid : styles.input}`}
          type="password"
          name="repeatedPassword"
          onBlur={(e) => {
            handleCheck(e);
          }}
          onChange={(e) => handleChange(e)}
          required
        />

        <button disabled={error} className={styles.button}>
          Зарегистрироваться
        </button>
      </form>

      <div className={styles.line}>
        <p className={styles.text}> Есть аккаунт? </p>{" "}
        <button className={styles.linkBtn} onClick={() => setHaveAccount(true)}>
          Войти
        </button>
      </div>
    </section>
  );
}
