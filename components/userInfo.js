import styles from "../styles/components/userInfo.module.css";
import Link from "next/link";
import Image from "next/image";
import cat from "../public/images/cat.jpg";
import Time from "./Time";

const UserInfo = ({
  avatar = cat.src,
  id,
  firstName,
  lastName,
  date = "",
  commentTime,
}) => {
  /*   {avatar=== "/uploads/img1_88655b2998.webp" ?  
    '/uploads/img1_88655b2998.webp'
    `http://localhost:1338${avatar}` */
  return (
    <div className={styles.user}>
      {avatar === "/_next/static/media/cat.eebee325.jpg" ? (
        <div className={styles.avatar}>
          <Image
            src={"/_next/static/media/cat.eebee325.jpg"}
            alt="Аватар"
            fill={true}
          />{" "}
        </div>
      ) : (
        <div className={styles.avatar}>
          <Image
            src={`http://85.193.90.17:1338${avatar}`}
            alt="Аватар"
            fill={true}
          />
        </div>
      )}

      <Link
        className={styles.link}
        href={{
          pathname: `/user/${id}`,
          query: {
            id,
          },
        }}
      >
        <p className={styles.name}>{firstName}</p>
        {lastName ? <p className={styles.name}>{lastName}</p> : null}
      </Link>

      {commentTime ? (
        <div className={styles.date}>
          <Time time={date} />
        </div>
      ) : (
        <p className={styles.date}>{date}</p>
      )}
    </div>
  );
};

export default UserInfo;
