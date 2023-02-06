import { useState } from "react";

const EntryModal = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleuserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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

  return <></>;
};

export default EntryModal;
