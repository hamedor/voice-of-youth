import styles from "../styles/components/hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.background}>
      <div className={styles.content}>
        <hr className={styles.hr1}></hr>
        <h1 className={styles.heading}>
          Екатеринбургское информационное агенство "Голос молодежи"
        </h1>
        <hr className={styles.hr2}></hr>
      </div>
      <div className={styles.videoContainer}>
        <video id="bgvideo" autoPlay muted disablePictureInPicture loop>
          <source src="/video/russia.mp4" />
        </video>
      </div>
      <p className={styles.text}>
        "Russia. Ekaterinburg / Россия. Екатеринбург (Drone Hyperlapse)".
        Источник: youtube.com
      </p>
    </section>
  );
};
