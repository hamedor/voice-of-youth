import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/components/form.module.css";

const Form = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [number, setNumber] = useState();
  const [addition, setAddition] = useState();

  const [requestData, setRequestData] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const handleAdditionChange = (e) => {
    setAddition(e.target.value);
  };

  const createNewRequest = (e) => {
    e.preventDefault();

    setRequestData({
      имя: name,
      фамилия: surname,
      номер: number,
      дополнительно: addition,
    });
  };

  useEffect(() => {
    if (requestData) {
      axios
        .post("http://localhost:1338/api/ezforms/submit", {
          formData: requestData,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
    }
  }, [requestData]);

  return (
    <form className={styles.form} onSubmit={createNewRequest}>
      <div className={styles.flex}>
        <div className={styles.line}>
          <label className={styles.label} htmlFor="name">
            Имя
          </label>
          <input
            className={styles.input}
            onChange={handleNameChange}
            name="name"
            type="text"
          ></input>
        </div>
        <div className={styles.line}>
          <label className={styles.label} htmlFor="surname">
            Фамилия
          </label>
          <input
            className={styles.input}
            onChange={handleSurnameChange}
            name="surname"
            type="text"
          ></input>
        </div>
      </div>
      <div className={styles.lineLarge}>
        <label className={styles.label} htmlFor="tel">
          Номер телефона
        </label>
        <input
          className={styles.input}
          onChange={handleNumberChange}
          name="tel"
          type="tel"
          required
        ></input>
      </div>
      <div className={styles.lineLarge}>
        <label className={styles.label} htmlFor="addition">
          Можешь оставить нам дополнительную контактную информацию или написать
          о себе
        </label>
        <textarea
          className={styles.textarea}
          name="addition"
          onChange={handleAdditionChange}
        ></textarea>
      </div>
      <input className={styles.button} type="submit" value="Отправить"></input>
    </form>
  );
};

export default Form;
