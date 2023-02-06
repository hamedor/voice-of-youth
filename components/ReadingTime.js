import styles from "../styles/components/readingTime.module.css";

const ReadingTime = ({ text }) => {
  const words = text.trim().split(/\s+/).length;

  const time = Math.ceil(words / 180);
  return (
    <div className={styles.flex}>
      <p className={styles.min}>Время чтения:</p>
      <p className={styles.min}>{time}</p>
      <p className={styles.min}>мин.</p>
    </div>
  );
};

export default ReadingTime;
