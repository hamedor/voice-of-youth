import Image from "next/image";
import tg from "../public/icons/tg.svg";
import vk from "../public/icons/vk.svg";
import world from "../public/icons/world.svg";
import styles from "../styles/components/socialIcons.module.css";

const SocialIcons = () => {
  return (
    <div className={styles.container}>
      <a className={styles.link} href="https://t.me/+OzDDGMOm7IUwN2Uy">
        <Image
          className={styles.icon}
          src={tg}
          alt="иконка телеграмм"
          fill={true}
        ></Image>
      </a>
      <a className={styles.link} href="https://vk.com/lycey110">
        <Image
          className={styles.icon}
          src={vk}
          alt="иконка вконтакте   "
          fill={true}
        ></Image>
      </a>
      <a className={styles.link} href="https://лицей110.екатеринбург.рф/">
        <Image
          className={styles.icon}
          src={world}
          alt="иконка веб сайта"
          fill={true}
        ></Image>
      </a>
    </div>
  );
};
export default SocialIcons;
