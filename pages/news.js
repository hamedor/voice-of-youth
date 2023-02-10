import React, {  useState } from "react";
import NewsList from "../components/newsList";
import styles from "../styles/pages/news.module.css";
import { motion } from "framer-motion";
import { FilterButtons } from "../components/filterButtons";


import {  CATEGORIES_QUERY } from "../lib/apollo";
import { useQuery } from "@apollo/client";

import Head from "next/head";


export default function News() {

  const [start, setStart] = useState(0);
  const [search, setSearch] = useState();
  const [selected, setSelected] = useState("Все новости");

  const [category, setCategory] = useState('');

  const filter = (e) => {
    setStart(0);
    setSearch("");
    setCategory(e);
    
    if (e === undefined) {
      setSelected("Все новости");
    } else {
      setSelected(e);
    }

    
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
              setCategory={setCategory}
              search={search}
              setSearch={setSearch}
        
              selected={selected}
              setSelected={setSelected}
              setStart={setStart}
            
              filter={filter}
              
            />
            <NewsList
              start={start}
              setStart={setStart}
              category={category}
              setCategory={setCategory}
              search={search}
              setSearch={setSearch}
              setSelected={setSelected}
              filter={filter}
    
            />

          </motion.div>
        </div>
      </div>
    </>
  );
}
