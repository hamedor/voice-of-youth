import { useState, useEffect } from "react";
import styles from "../styles/components/commentsLength.module.css";

const CommentsLength = ({ comments }) => {

  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(()=>{
    const first = comments.length;
    const second = comments.map(e=>e.attributes.comments_arrays.data.length);

    setCommentsCount(first + second[0]);
  },[comments])


  
  const Declination = () => {
    let n = Math.abs(commentsCount);
    if (n >= 5 && n <= 20) {
      return <p className={styles.ending}>комментрариев</p>;
    }
    n %= 10;
    if (n === 1) {
      return <p className={styles.ending}>комментарий</p>;
    }
    if (n >= 2 && n <= 4) {
      return <p className={styles.ending}>комментария</p>;
    }
    return <p className={styles.ending}>комментрариев</p>;
  };

  return (
    <div className={styles.flex}>
      <p className={styles.text}>{commentsCount ? commentsCount :  0}</p>
      <Declination />
    </div>
  );
};

export default CommentsLength;
