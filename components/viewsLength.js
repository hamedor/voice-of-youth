import styles from "../styles/components/viewsLength.module.css";

const ViewsLength = ({ views }) => {
  const Declination = () => {
    let n = Math.abs(views);

    if (n === 1) {
      return <p className={styles.ending}>просмотр</p>;
    }
    if (n >= 2 && n <= 4) {
      return <p className={styles.ending}>просмотра</p>;
    }
    return <p className={styles.ending}>просмотров</p>;
  };

  return (
    <div className={styles.flex}>
      <p className={styles.text}>{views}</p>
      <Declination />
    </div>
  );
};

export default ViewsLength;
