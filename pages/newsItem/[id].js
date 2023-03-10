import { useRouter } from "next/router";

import { motion } from "framer-motion";
import useDeviceSize from "../../components/useDeviceSize";
import styles from "../../styles/pages/newsItem.module.css";
import DOMPurify from "isomorphic-dompurify";

import UserInfo from "../../components/userInfo";
import Comment from "../../components/comment";
import Likes from "../../components/likes";
import ReadingTime from "../../components/ReadingTime";
import { CATEGORIES_QUERY, ARTICLE_QUERY } from "../../lib/apollo";
import { useQuery } from "@apollo/client";

import Spinner from "../../components/spinner";

const News = () => {
  const [width, height] = useDeviceSize();

  const router = useRouter();
  const { id } = router.query;

  const { data: dataArticles, loading: loadingArticle } = useQuery(
    ARTICLE_QUERY,
    {
      variables: {
        id,
      },
      fetchPolicy: "network-only",
    }
  );

  return (
    <motion.div
      className={"newsWrapper"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: width, transition: { duration: 1 }, zIndex: 22 }}
    >
      {loadingArticle ? <Spinner /> : null}
      <section>
        {dataArticles?.articles.data.map((e) => (
          <div key={e.id} className={styles.news}>
            <div className={styles.flex}>
            <UserInfo
              avatar={
                e.attributes.users_permissions_user.data.attributes.avatar.data
                  .attributes.url
              }
              id={e.attributes.users_permissions_user.data.id}
              firstName={
                e.attributes.users_permissions_user.data.attributes.firstName
              }
              lastName={
                e.attributes.users_permissions_user.data.attributes.lastName
              }
              date={e.attributes.date.split("-").reverse().join("-")}
            />
            <ReadingTime text={e.attributes.text} />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(e.attributes.text),
              }}
              className={"ck-content"}
            ></div>
            <div className={styles.like}>
              <Likes id={e.id} entries={e.attributes.likes.data} />
            </div>
          </div>
        ))}

        <Comment id={id} />
      </section>
    </motion.div>
  );
};

export default News;
