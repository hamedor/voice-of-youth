import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../public/images/logo.jpg";
import styles from "../styles/components/header.module.css";
import Modal from "react-modal";
import { useRouter } from "next/router";
import SocialIcons from "./socialIcons";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Image src={LogoImage} alt="логотип сайта голос молодежи" fill={true} />
    </div>
  );
};
const Session = ({ burgerToggle }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <>
        <Link
          onClick={burgerToggle}
          className={styles.link}
          href="/auth/profile"
        >
          Профиль
        </Link>
        <button className={styles.button} onClick={() => signOut()}>
          Выход
        </button>
      </>
    );
  }
  return (
    <>
      <p className={styles.text}>Вход не выполнен </p>
      <Link onClick={burgerToggle} className={styles.link} href="/auth/signIn">
        Вход
      </Link>
      <Modal
        isOpen={!!router.query.postId}
        onRequestClose={() => router.push("/")}
        contentLabel="Post modal"
      ></Modal>
    </>
  );
};

const Header = () => {
  const [fixedHeader, setFixedHeader] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= 305) {
        setFixedHeader(true);
      }
      if (scrollPosition <= 100) {
        setFixedHeader(false);
      }
    });
  });

  const burgerToggle = () => {
    if ((document.body.style.overflow = "hidden")) {
      document.body.style.overflow = "auto";
    }
    setBurgerOpen((prev) => !prev);
  };

  return (
    <>
      <header className={styles.headerMobile}>
        <div className={styles.flex}>
          <Link href="/">
            <div className={styles.mobileLogo}>
              <Image
                src={LogoImage}
                alt="логотип сайта голос молодежи"
                fill={true}
              />
            </div>
          </Link>

          <div
            onClick={burgerToggle}
            className={
              burgerOpen
                ? `${styles.burger} ${styles.burgerActive}`
                : styles.burger
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <nav
          className={
            burgerOpen ? `${[styles.nav]} ${styles.active}` : styles.nav
          }
        >
          <Link onClick={burgerToggle} className={styles.link} href="/">
            <Logo />
          </Link>

          <Link onClick={burgerToggle} className={styles.link} href="/news">
            Новости
          </Link>
          <Link onClick={burgerToggle} className={styles.link} href="/lyceum">
            Лицей
          </Link>
          <Link onClick={burgerToggle} className={styles.link} href="/about">
            О нас
          </Link>
          <Link onClick={burgerToggle} className={styles.link} href="/team">
            Стать частью команды
          </Link>
          <SocialIcons />

          <Session burgerToggle={burgerToggle} />
        </nav>
      </header>
      <header className={fixedHeader ? styles.headerFixed : `${styles.header}`}>
        <div className="localWrapper">
          <nav
            className={
              burgerOpen ? `${[styles.nav]} ${styles.active}` : styles.nav
            }
          >
            <Link className={styles.link} href="/">
              <Logo />
            </Link>

            <Link className={styles.link} href="/news">
              Новости
            </Link>
            <Link className={styles.link} href="/lyceum">
              Лицей
            </Link>
            <Link className={styles.link} href="/about">
              О нас
            </Link>
            <Link className={styles.link} href="/team">
              Стать частью команды
            </Link>
            <SocialIcons />

            <Session />
          </nav>
          <ul className={styles.social}></ul>
        </div>
      </header>
    </>
  );
};

/* export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};
 */
export default Header;
