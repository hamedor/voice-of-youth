import Link from "next/link";
import Likes from "./likes";
import CommentsLength from "./commentsLength";
import ViewsLength from "./viewsLength";

import styles from "../styles/components/newsListContent.module.css";

const NewsListContent = ({ id, title, text, views, comments }) => {
  return (
    <>
      <Link
        className={styles.link}
        href={{
          pathname: `/newsItem/${id}`,
          query: {
            id,
          },
        }}
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </Link>
      <hr className={styles.hr}></hr>
      <div className={styles.lineContainer}>
        <ViewsLength views={views} />

        <Link
          className={styles.link}
          href={{
            pathname: `/newsItem/${id}`,
            query: {
              id,
            },
          }}
        >
          <CommentsLength comments={comments} />
        </Link>

        <Likes id={id} />
      </div>
    </>
  );
};

export default NewsListContent;
