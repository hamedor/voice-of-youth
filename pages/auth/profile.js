import { useSession, signOut, getSession } from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/pages/profile.module.css";

export default function Profile() {
  const { data: session, status } = useSession();
  console.log(session)


  const [changeData, setChangeData] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    register({
      variables: {
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        
        base64:userData.base64
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
/* 
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
  }; */





  return (
    <>
      {session && (
        <div className={styles.profile}>
          <h2 className={styles.title}>Профиль</h2>
          <p className={styles.text}>Электронная почта: {session.user.email}</p>
          <p className={styles.text}>Имя: {session.user.firstName}</p>
          <p className={styles.text}>Фамилия: {session.user.lastName}</p>
          <p className={styles.text}>
            Имя пользователя: {session.user.username}
          </p>

          {/* <button onClick={()=>setChangeData(true)}></button> */}
        </div>
      )}
      {!session && <p>Вы не вошли</p>}
    </>
  );
}
