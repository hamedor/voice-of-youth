import styles from "../styles/components/spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <h3 className={styles.title}>Загрузка</h3>
      <div className={styles.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
