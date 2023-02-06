import { motion } from "framer-motion";
import styles from "../styles/pages/lyceum.module.css";
import useDeviceSize from "../components/useDeviceSize";
import Image from "next/image";

import lyceumImage from "../public/images/lyceum/lyceum.webp";
import Head from "next/head";

export default function Lyceum() {


  const [width, height] = useDeviceSize();
  return (
    <>
    <Head>
    <title>Лицей</title>
    
    </Head>
    <div className="wrapper">
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: width, transition: { duration: 1 }, zIndex: 22 }}
      >
        <div className={styles.flex}>
          <div className={styles.column}>
            <h2 className={styles.title}>Лицей №110</h2>
            <p className={styles.text}>
              В 1950-м году был заложен первый камень в строительстве будущей
              школы №110. С тех пор школа получила звание Лицея и вошла в список
              лучших школ России. Сегодня, в век цифровых технологий и
              руководствуясь творческим порывом, мы заложили цифровой камень в
              создании новостного портала, через который учащиеся Лицея №110 им.
              Л. К. Гришиной будут говорить вами! За нами - будущее, поэтому
              услышьте ГОЛОС МОЛОДЕЖИ ЛИЦЕЯ № 110!
            </p>
          </div>
          <div className={styles.column}>
            <Image src={lyceumImage} alt="фото лицея" fill={true} />
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
}
