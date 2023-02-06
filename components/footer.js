import styles from "../styles/components/footer.module.css";
import { getSession } from "next-auth/react";
import SocialIcons from "./socialIcons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        <div className={styles.flex}>
          <div className={styles.column}>
            <p className={styles.title}>Редакция</p>
            <p className={styles.text}>Екатеринбург, ул. Мичурина, 98</p>
            <a
              className={styles.link}
              href="mailto: golos110molodezhi@gmail.com"
            >
              golos110molodezhi@gmail.com
            </a>
            <p className={styles.text}>
              Руководитель проекта "Голос Молодежи" Лицея № 110 Мягкая Екатерина
              Борисовна
            </p>
          </div>
          <div className={styles.column}>
            <p className={styles.title}>Подписаться на новости</p>
            <SocialIcons />
            <p className={styles.textNoMargin}>
              Голос Молодежи - это школьный информационный портал, где учащиеся
              публикуют свои журналистские материалы на тему образования и жизни
              в городе Екатеринбурге.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
