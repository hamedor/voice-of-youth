import Image from "next/image";
import Link from "next/link";
import feather from "../public/icons/feather.png";
import styles from "../styles/components/newsListNewsInfo.module.css";
import ReadingTime from "./ReadingTime";
import UserInfo from "./userInfo";

import defaultAvatar from "../public/images/cat.jpg";

const NewsListNewsInfo = ({
  avatar,
  firstName,
  lastName,
  id,
  date,
  authorPage,
  category,
  filter,
  text,
}) => {
  return (
    <>
      <div className={styles.line}>
        {!authorPage && (
          <div className={styles.flex}>
            <UserInfo
              avatar={avatar}
              id={id}
              firstName={firstName}
              lastName={lastName}
            />

            {/*     <Image
              className={styles.imgButton}
              src={feather}
              alt="иконка- кнопка"
              width={21}
              height={21}
            /> */}
          </div>
        )}

        <p className={styles.date}>{date}</p>
        <ReadingTime text={text} />
      </div>
      {category && (
        <button className={styles.button} onClick={() => filter(category)}>
          {category}
        </button>
      )}
    </>
  );
};

export default NewsListNewsInfo;
