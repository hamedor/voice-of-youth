import Highlighter from "react-highlight-words";

import NewsListHighLight from './newsListHighlight'
import NewsListNewsInfo from "./newsListNewsInfo";
import styles from "../styles/components/newsListSearched.module.css";
import { useEffect } from "react";
import React from "react";
import { useQuery } from "@apollo/client";
import { ARTICLE_QUERY } from "../lib/apollo";
import { useState } from "react";

const NewsListSearched = ({ search }) => {

  console.log(search)

  const { data: dataArticles, loading: loadingArticle } = useQuery(
    ARTICLE_QUERY,
    {
      variables: {
       search
      },
      fetchPolicy: "network-only",
    }
  );
  
 let text = dataArticles?.articles.data.map(e=>e.attributes.text)
 console.log(text)


  return (
    <>
             



    {dataArticles?.articles.data.map(e=>{
      return(
        <div className={styles.container} key={e.id}>
                <NewsListNewsInfo
                  avatar={
                    e.attributes.users_permissions_user.data.attributes.avatar
                      .data.attributes.url
                  }
                  firstName={
                    e.attributes.users_permissions_user.data.attributes
                      .firstName
                  }
                  lastName={
                    e.attributes.users_permissions_user.data.attributes.lastName
                  }
                  id={e.attributes.users_permissions_user.data.id}
                  date={e.attributes.date.split("-").reverse().join("-")}
                  authorPage={false}
                  category={""}
                  filter={""}
                  text={e.attributes.text}
                />
                <NewsListHighLight key={e.id}
                      id={e.id}
                      title={e.attributes.title}
                      text={e.attributes.text}
                      search={search}  
                  />
          </div>
      )
    })}     
    </>
  );
};

export default NewsListSearched;
