import Notification from "./notification";


const ValidationErrors = ({ error }) => {
  return (
    <>
      {error === "Email or Username are already taken" ? (
        <Notification text={"Введенные имя пользователя или электронная почта уже существуют!"}/>
    
      ) : null}
      {error === "email must be a valid email" ? (
         <Notification text={"Введите валидный адрес электронной почты!"}/>
   
      ) : null}
      {error === "Credential is not valid" ? (
        <Notification text={"Неверное имя пользователя или пароль"}/>

      ) : null}
    </>
  );
};

export default ValidationErrors;
