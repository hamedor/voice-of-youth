import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import AuthorPageNewsList from "../../components/authorPageNewsList";
import styles from "../../styles/pages/author.module.css";
import { motion } from "framer-motion";
import useDeviceSize from "../../components/useDeviceSize";
import Image from "next/image";
import {
  USERS_QUERY,
  ARTICLES_QUERY,
  CATEGORIES_QUERY,
} from "../../lib/apollo";
import { useQuery, NetworkStatus, gql } from "@apollo/client";
import client from "../../lib/apollo";
import useInfinityLoading from "../../components/useInfinityLoading";


const User = () => {
  const [moreItems, setMoreItems] = useState(true);

  const [search, setSearch] = useState();
  const [category, setCategory] = useState();

  const [filtered, setFiltered] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  const users = useQuery(USERS_QUERY);
  const [entries, setEntries] = useState([]);
  const [articles, setArticles] = useState();
  const [user, setUser] = useState(id);

  const [data, loading, fetchInf, fetchMore] = useInfinityLoading(
    category,
    search,
    user
  );

  /*
useEffect(()=>{
 setArticles(client.readQuery({
  query: ARTICLES_QUERY,
}));
},[])
*/

  useEffect(() => {
    if (!users.loading) {
      const user = users.data.usersPermissionsUsers.data.reduce(
        (newArr, item) => {
          if (item.id === id) {
            newArr.push(item);
          }
          return newArr;
        },
        []
      );
      setEntries(user);
    }
  }, [users.loading]);

  return (
    <motion.div
      className="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="wrapper">
        <div className={styles.flex}>
          {!users.loading && (
            <section className={styles.left}>
              {entries.map((e) => (
                <div key={e.id} className={styles.author}>
                  <div className={styles.img}>
                    {e.attributes.avatar.data && (
                      <Image
                        src={`http://85.193.90.17:1338${e.attributes.avatar.data.attributes.url}`}
                        alt="Picture of the author"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>

                  <h4 className={styles.title}>{e.attributes.firstName}</h4>
                  <h4 className={styles.title}>{e.attributes.lastName}</h4>
                  <div className={styles.beige}>{e.attributes.beige}</div>

                  <button className={styles.button}>Подписаться</button>
                </div>
              ))}

              <div className={styles.posts}>
                <h3 className={styles.profileTitle}></h3>
                <p className={styles.date}></p>
              </div>
            </section>
          )}
          {!loading && (
            <InfiniteScroll
              dataLength={data.articles.data.length}
              next={fetchInf}
              hasMore={moreItems}
            >
              <AuthorPageNewsList entries={data} />
            </InfiniteScroll>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default User;

//
