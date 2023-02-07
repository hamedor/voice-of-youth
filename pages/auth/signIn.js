import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../../styles/pages/modal.module.css";

import ModalSignIn from "../../components/modal/modalSignIn";
import ModalSignUp from "../../components/modal/modalSignUp";

import Notification from "../../components/notification";

export default function SignIn({ csrfToken }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalOpen, setModalOpen] = useState(true);

  const [haveAccount, setHaveAccount] = useState(true);

  const [registerSucces, setRegisterSucces] = useState(false);

  const close = () => {
    setModalOpen(false);
    router.back();
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    }
    if (!modalOpen) {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  if (registerSucces) {
    setTimeout(() => setRegisterSucces(false), 5000);
  }

  return (
    <div className={styles.modal}>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => close()}
        contentLabel="Post modal"
        ariaHideApp={false}
      >
        {haveAccount && (
          <>
            <ModalSignIn
              csrfToken={csrfToken}
              setHaveAccount={setHaveAccount}
            />
          </>
        )}
        {!haveAccount && (
          <ModalSignUp
            setHaveAccount={setHaveAccount}
            setRegisterSucces={setRegisterSucces}
          />
        )}
        {registerSucces ? (
          <Notification
            text={"Регистрация успешна! Войдите, используя свои данные."}
          />
        ) : null}
        <button
          className={styles.buttonClose}
          onClick={() => close()}
          type="button"
        ></button>
      </Modal>
    </div>
  );
}
//<SignInComponent a={a} setA={setA} csrfToken={csrfToken}/>
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
