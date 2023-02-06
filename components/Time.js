import styles from "../styles/components/time.module.css";

const Time = ({ time }) => {
  const ConvertTZ = () => {
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",

      timezone: "UTC",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    //const date= new Date((typeof time === "string" ? new Date(time) : time).toLocaleDateString("ru-RU", {timeZone: "Asia/Yekaterinburg"}));

    const date = new Date(time);

    const dateRu = date.toLocaleString("ru", options);

    const array = dateRu.toString().split(", ");

    const currentDay = array[0];
    const currentTime = array[1];

    return (
      <div className={styles.flex}>
        <p className={styles.day}>{currentDay}</p>
        <p className={styles.time}>{currentTime}</p>
      </div>
    );
  };

  return (
    <div>
      <ConvertTZ />
    </div>
  );
};

export default Time;
