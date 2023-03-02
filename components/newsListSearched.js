import Highlighter from "react-highlight-words";

import Link from "next/link";
import styles from "../styles/components/newsListSearched.module.css";
import { useEffect } from "react";

const NewsListSearched = ({ id, text, title, search, fetchMore }) => {

 useEffect(()=>{
  console.log(search)

/*     fetchMore({
      variables:{
        search
      }
    }) */
  
 },[search])


 /*  const convert = text.replace(/(<([^>]+)>)/gi, "");
  const newStr = convert.replace(/&nbsp;/g, ""); */

  return (
    <div className={styles.container}>
{/*       <Link
        className={styles.link}
        href={{
          pathname: `/newsItem/${id}`,
          query: {
            id,
          },
        }}
      >
        <h2 className={styles.title}>
          <Highlighter
            highlightClassName={styles.highlighted}
            searchWords={[search]}
            autoEscape={true}
            textToHighlight={title}
          />
        </h2>
        <Highlighter
          className={styles.text}
          highlightClassName={styles.highlighted}
          searchWords={[search]}
          autoEscape={true}
          textToHighlight={newStr}
        />
      </Link> */}
    </div>
  );
};

export default NewsListSearched;
