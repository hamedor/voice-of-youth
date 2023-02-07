import React, { useEffect, useState } from "react";

import NewsList from "../components/newsList";

import styles from "../styles/pages/news.module.css";
import { motion } from "framer-motion";

import { FilterButtons } from "../components/filterButtons";
import InfiniteScroll from "react-infinite-scroll-component";

/* import useInfinityLoading from "../components/useInfinityLoading"; */

import { ARTICLES_QUERY, CATEGORIES_QUERY } from "../lib/apollo";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Spinner from "../components/spinner";

export default function News() {
  const [searchAfterSubmit, setSearchAfterSubmit] = useState();
  const [start, setStart] = useState(0);
  const [search, setSearch] = useState();
  const [selected, setSelected] = useState("Все новости");

  const [category, setCategory] = useState(null);

  const [isNeverSearched, setIsNeverSearched] = useState(true);

  const filter = (e) => {
    setStart(0);
    setCategory(e);
    if (e === undefined) {
      setSelected("Все новости");
    } else {
      setSelected(e);
    }

    setSearch("");
  };

  const { data: categories, loading: categoriesLoading } = useQuery(
    CATEGORIES_QUERY,
    {
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
    }
  );

  return (
    <>
      <Head>
        <title>Новости</title>
      </Head>

      <div className={styles.background}>
        <div className="newsWrapper">
          <motion.div
            className={styles.content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ transition: { duration: 1 }, zIndex: 22 }}
          >
            <FilterButtons
              categories={categories}
              categoriesLoading={categoriesLoading}
              category={category}
              search={search}
              setSearch={setSearch}
              setSearchAfterSubmit={setSearchAfterSubmit}
              selected={selected}
              setSelected={setSelected}
              setStart={setStart}
              setIsNeverSearched={setIsNeverSearched}
              filter={filter}
            />
            <NewsList
              start={start}
              setStart={setStart}
              category={category}
              search={search}
              setSearch={setSearch}
              filter={filter}
              isNeverSearched={isNeverSearched}
            />

            {/*         {!loading && (
            <InfiniteScroll
              dataLength={data.articles.data.length}
              next={fetchInf}
              hasMore={moreItems}
            >
              {!search && (
                <NewsList
                  entries={data?.articles}
   
                  filter={filter}
                />
              )}

          {search && data.articles.data.length ?
                data.articles.data.map((e) => {
                  return (
                    <div className={styles.container} key={e.id}>
                    <NewsListNewsInfo
                avatar={e.attributes.users_permissions_user.data.attributes.avatar.data.attributes.url}
                firstName={
                  e.attributes.users_permissions_user.data.attributes.firstName
                }
                lastName={
                  e.attributes.users_permissions_user.data.attributes.lastName
                }
                id={e.attributes.users_permissions_user.data.id}
                date={e.attributes.date.split("-").reverse().join("-")}
                authorPage={false}
                category={''}
                filter={''}
                text={e.attributes.text}
              />

                    <NewsListSearched key={e.id}
                      id={e.id}
                      text={e.attributes.text}
                      title={e.attributes.title}
                      data={data}
                      search={search}
                    />
                   </div>
                  );
                }): null}
          
              {search && !data.articles.data.length ?
                 <NewsListSearchedFail setSearch={setSearch}/>  
              :null}



            </InfiniteScroll>
          )} */}
            {/* {loading ? <Spinner/>:null} */}
          </motion.div>
        </div>
      </div>
    </>
  );
}
