import Image from "next/image";
import styles from "../styles/components/newsList.module.css";

import React from "react";

import NewsListSearched from "../components/newsListSearched";
import NewsListSearchedFail from "../components/newsListSearchedFail";
import NewsListNewsInfo from "../components/newsListNewsInfo";

import NewsListContent from "./newsListContent";
import Spinner from "./spinner";

import { ARTICLES_QUERY, CATEGORIES_QUERY } from "../lib/apollo";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { useInView} from "react-intersection-observer";

const NewsList = ({
  start,
  setStart,
  category,
  search,
  setSearch,
  isNeverSearched,
  authorPage,
  filter,
}) => {
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  const [limit, setLimit] = useState(3);

  const {
    data: entries,
    loading,
    error,
    fetchMore,
    refetch,
  } = useQuery(ARTICLES_QUERY, {
    variables: {
      limit: 3,
      start: 0,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const fetchInf = () => {
    let categoryInner;
    if (category === null) {
      categoryInner = undefined;
    } else {
      categoryInner = category;
    }
    fetchMore({
      variables: {
        limit: limit,
        start,
        filters: categoryInner,
        search,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          ...prevResult.articles.data,
          articles: {
            data: [
              ...prevResult.articles.data,
              ...fetchMoreResult.articles.data,
            ],
          },
        };
      },
    });
  };

  useEffect(() => {
    if (start !== 0) {
      fetchInf();
    }
  }, [start]);
  useEffect(() => {
    if (inView) {
      setStart((prev) => prev + 3);
    }
  }, [inView]);

  useEffect(() => {
    if (category || category === undefined) {
      fetchMore({
        variables: {
          filters: category,
          search: "",
        },
      });
    }
  }, [category]);

  useEffect(() => {
    if (search) {
      fetchMore({
        variables: {
          search,
        },
      });
    }
    if (!search && !isNeverSearched) {
      setStart(0)
      fetchMore({
        variables: {
          filters:category,
          start
        },
      });
    }
  }, [search]);

  return (
    <ul>
      {!search
        ? entries?.articles?.data?.map((e, id) => {
            const lastElement = id === entries.articles.data.length - 1;

            return (
              <li
                className={authorPage ? styles.authorItem : styles.item}
                key={e.id}
                ref={lastElement ? ref : null}
              >
                <div
                  className={authorPage ? styles.authorColumn : styles.column}
                >
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
                      e.attributes.users_permissions_user.data.attributes
                        .lastName
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
                </div>
                <div
                  className={authorPage ? styles.authorColumn : styles.column}
                >
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
          })
        : entries.articles.data.length
        ? entries.articles.data.map((e) => {
            return (
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

                <NewsListSearched
                  key={e.id}
                  id={e.id}
                  text={e.attributes.text}
                  title={e.attributes.title}
                  data={entries}
                  search={search}
                />
              </div>
            );
          })
        : null}
      {search && !entries.articles.data.length ? (
        <NewsListSearchedFail setSearch={setSearch} />
      ) : null}

      {loading ? <Spinner /> : null}
    </ul>
  );
};

export default NewsList;
