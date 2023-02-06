import styles from "../styles/components/commentsLength.module.css";

const CommentsLength = ({ comments }) => {
  const Declination = () => {
    let n = Math.abs(comments);
    if (n >= 5 && n <= 20) {
      return <p className={styles.ending}>комментрариев</p>;
    }
    n %= 10;
    if (n === 1) {
      return <p className={styles.ending}>комментарий</p>;
    }
    if (n >= 2 && n <= 4) {
      return <p className={styles.ending}>комментария</p>;
    }
    return <p className={styles.ending}>комментрариев</p>;
  };

  return (
    <div className={styles.flex}>
      <p className={styles.text}>{comments}</p>
      <Declination />
    </div>
  );
};

export default CommentsLength;
