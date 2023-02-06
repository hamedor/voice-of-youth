import styles from "../styles/components/notification.module.css";

const Notification = ({ text }) => {
  return (
    <div className={styles.notification}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Notification;
