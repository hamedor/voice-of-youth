import { useSession, signOut, getSession } from "next-auth/react";
import styles from '../../styles/pages/profile.module.css';

export default function Profile() {
  const { data: session, status } = useSession();

  return (
    <>
      {session && 
      <div className={styles.profile}>
        <h2 className={styles.title}>Профиль</h2>
        <p className={styles.text}>Электронная почта: {session.user.email}</p>
        <p className={styles.text}>Имя: {session.user.firstName}</p>
        <p className={styles.text}>Фамилия: {session.user.lastName}</p>
        <p className={styles.text}>Имя пользователя: {session.user.username}</p>
      </div>}
      {!session && <p>Вы не вошли</p>}
    </>
  );
}
