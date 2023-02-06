import Link from "next/link";
import styles from "../styles/components/heroTwo.module.css";

export const HeroTwo = () => {
  return (
    <section className={styles.about}>
      <div className={styles.background}>
        <div className="localWrapper">
          <div className={styles.block}>
            <h2 className={styles.title}>Голос молодежи</h2>
            <p className={styles.text}>
              Голос Молодежи - новостной портал, созданный редакцией Лицея №110,
              с целью освещения событий Екатеринбурга и его учебных организаций.
            </p>
            <Link className={styles.button} href="/news">
              Узнать больше
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
