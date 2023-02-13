import Image from "next/image";

import React from "react";

import { useEffect } from "react";

import ReadingTime from "./ReadingTime";

import NewsListContent from "./newsListContent";

import styles from "../styles/components/authorPageNewsList.module.css";

import {useInView} from "react-intersection-observer";

const AuthorPageNewsList = ({ entries,setStart }) => {

  const { ref, inView, entry } = useInView({
    threshold:0.1,
    root: null,
    rootMargin: "0px",
  });


  useEffect(() => {
    if (inView) {
      setStart((prev) => prev + 3);
    }
  }, [inView]);
  
  return (
    <section className={styles.articles}>
      <h3 className={styles.title}>Посты</h3>
   
    <ul>
        {entries?.articles?.data?.map((e, id) => {
            const lastElement = id === entries.articles.data.length - 1;

            return (
              <li
                className={styles.article}
                key={e.id}
                ref={lastElement ? ref : null}
              >
          <div className={styles.image}>
            <Image
              src={`http://85.193.90.17:1338${e.attributes.previewImage.data.attributes.url}`}
              alt="Превью к новости"
              fill={true}
            />
          </div>
          <div className={styles.textContent}>
            <div className={styles.flex}>
              <p className={styles.date}>
                {e.attributes.date.split("-").reverse().join("-")}
              </p>
              <ReadingTime text={e.attributes.text} />
            </div>
            <NewsListContent
              id={e.id}
              title={e.attributes.title}
              text={e.attributes.previewText}
              views={e.attributes.views}
              comments={e.attributes.comments.data.length}
            />
          </div>
              </li>
            );
          })
        }


    </ul>
        
        
        

     
         
    
    </section>
  );
};

export default AuthorPageNewsList;



/*      <div key={e.id} className={styles.article}>
          <div className={styles.image}>
            <Image
              src={`http://85.193.90.17:1338${e.attributes.previewImage.data.attributes.url}`}
              alt="Превью к новости"
              fill={true}
            />
          </div>
          <div className={styles.textContent}>
            <div className={styles.flex}>
              <p className={styles.date}>
                {e.attributes.date.split("-").reverse().join("-")}
              </p>
              <ReadingTime text={e.attributes.text} />
            </div>
            <NewsListContent
              id={e.id}
              title={e.attributes.title}
              text={e.attributes.previewText}
              views={e.attributes.views}
              comments={e.attributes.comments.data.length}
            />
          </div>
        </div> */