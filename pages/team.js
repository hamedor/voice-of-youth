import styles from "../styles/pages/team.module.css";
import { motion } from "framer-motion";
import Form from "../components/form";
import useDeviceSize from "../components/useDeviceSize";
import SocialIcons from "../components/socialIcons";

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import Head from "next/head";

export default function Team() {
  const defaultState = {
    center: [56.8383149745264, 60.626248141056905],
    zoom: 16,
  };

  const [width, height] = useDeviceSize();
  return (
    <>
      <Head>
        <title>Стать частью команды</title>
      </Head>
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: width, transition: { duration: 1 }, zIndex: 22 }}
      >
        <div className={styles.background}></div>
        <div className="wrapper">
          <div className={styles.content}>
            <div className={styles.flex}>
              <div className={styles.column}>
                <h3 className={styles.title}>Стать корреспондентом</h3>
                <p className={styles.text}>
                  Если ты хочешь стать нашим корреспондентом - заполни небольшую
                  анкету и мы свяжемся с тобой!
                </p>
                <div className={styles.social}>
                  <p className={styles.socialText}>Мы в социальных сетях:</p>
                  <SocialIcons />
                  <p className={styles.socialText}>Email:</p>
                  <p className={styles.socialText}>
                    golos110molodezhi@gmail.com
                  </p>
                </div>
              </div>
              <Form />
            </div>
            <div className={styles.map}>
              <YMaps>
                <Map
                  width={"100%"}
                  height={"99.5%"}
                  defaultState={defaultState}
                >
                  <Placemark
                    geometry={[56.8383149745264, 60.626248141056905]}
                  />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
