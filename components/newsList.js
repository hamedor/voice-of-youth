import Image from "next/image";
import styles from "../styles/components/newsList.module.css";
import Link from "next/link";

import Likes from "./likes";
import feather from "../public/icons/feather.png";
import React from "react";
import { useSession } from "next-auth/react";

import NewsListNewsInfo from "./newsListNewsInfo";
import NewsListContent from "./newsListContent";

import CommentsLength from "./commentsLength";
import ViewsLength from "./viewsLength";

const NewsList = ({ entries, authorPage, filter }) => {

  return (
    <ul>
      {entries?.data?.flatMap((e) => {
        return (
          <li
            className={authorPage ? styles.authorItem : styles.item}
            key={e.id}
          >
            <div className={authorPage ? styles.authorColumn : styles.column}>
              <NewsListNewsInfo
                avatar={
                  e.attributes.users_permissions_user.data.attributes.avatar
                    .data.attributes.url
                }
                firstName={
                  e.attributes.users_permissions_user.data.attributes.firstName
                }
                lastName={
                  e.attributes.users_permissions_user.data.attributes.lastName
                }
                id={e.attributes.users_permissions_user.data.id}
                date={e.attributes.date.split("-").reverse().join("-")}
                authorPage={authorPage}
                category={e.attributes.category.data.attributes.name}
             
                filter={filter}
                text={e.attributes.text}

               
              />
               <NewsListContent 
                id={e.id}
                title={e.attributes.title}
                text={e.attributes.previewText}
                views={e.attributes.views}
                comments={e.attributes.comments.data.length}
             
               />

{/* 
              <Link
                className={styles.link}
                href={{
                  pathname: `/newsItem/${e.id}`,
                  query: {
                    id: e.id,
                  },
                }}
              >
                <h2 className={styles.title}>{e.attributes.title}</h2>
                <p className={styles.text}>{e.attributes.previewText}</p>
              </Link>
              <hr className={styles.hr}></hr>
              <div className={styles.lineContainer}>
                <ViewsLength views={e.attributes.views} />

                <Link
                  className={styles.link}
                  href={{
                    pathname: `/newsItem/${e.id}`,
                    query: {
                      id: e.id,
                    },
                  }}
                >
                  <CommentsLength
                    comments={e.attributes.comments.data.length}
                  />
                </Link>

           
                <Likes id={e.id} entries={e.attributes.likes.data} />
            
              </div> */}
            </div>
            <div className={authorPage ? styles.authorColumn : styles.column}>
              {e.attributes.previewImage.data && (
                <Image
                  src={`http://85.193.90.17:1338${e.attributes.previewImage.data.attributes.url}`}
                  alt="Превью к новости"
                  fill={true}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NewsList;
