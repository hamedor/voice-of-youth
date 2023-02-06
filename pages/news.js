import React, { useEffect, useState } from "react";

import NewsList from "../components/newsList";
import NewsListSearched from "../components/newsListSearched";
import NewsListSearchedFail from "../components/newsListSearchedFail";
import NewsListNewsInfo from "../components/newsListNewsInfo";
import styles from "../styles/pages/news.module.css";
import { motion } from "framer-motion";

import { FilterButtons } from "../components/filterButtons";
import InfiniteScroll from "react-infinite-scroll-component";

import useInfinityLoading from "../components/useInfinityLoading";

import { ARTICLES_QUERY, CATEGORIES_QUERY } from "../lib/apollo";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Spinner from "../components/spinner";

export default function News() {
  const [moreItems, setMoreItems] = useState(true);

  const categories = useQuery(CATEGORIES_QUERY);

  const [limit, setLimit] = useState(3);

  const [searchAfterSubmit, setSearchAfterSubmit] = useState();

  const [search, setSearch] = useState();
  const [selected,setSelected] = useState('Все новости');

  const [category, setCategory] = useState(null);


  const filter = (e) => {
    setCategory(e);
    if(e===undefined){
      setSelected('Все новости')
    }else{
      setSelected(e);
    }
    
    setSearch('');
    
  };

/*   const [data, loading, fetchInf, fetchMore, refetch, start] = useInfinityLoading(
    category,
    search
  ); */

  
 const {data,loading,error,fetchMore,refetch} = useQuery(ARTICLES_QUERY, {
  variables: {
    limit: 3,
    start: 0,
 
  },
  fetchPolicy:'cache-and-network',
  nextFetchPolicy:'cache-first'
});

const fetchInf = () => {
  let categoryInner;
  if(category===null){
    categoryInner=undefined;
  }else{
    categoryInner=category;
  }
  fetchMore({
    variables: {
      limit: limit,
      start: data.articles.data.length,
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



//ТУТ ВСЕ ПОЛОМАЛОСЬ НАДО ПРИДУМАТЬ ПО ДРУГОМУ!!!!!!!!!!!!!!!!!!!!!!!!!!

  useEffect(() => {
   
    if((category || category === undefined) ){

      fetchMore({
        variables: {
          filters: category,
          search: ""
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
    }if(!search){
    
      fetchMore({
        variables:{
          search,
          filters: category,
        }
      })
    }
  }, [search]);

 

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
            category={category}
            search={search}
            setSearch={setSearch}
            setSearchAfterSubmit={setSearchAfterSubmit}
            selected={selected}
            setSelected={setSelected}
   
            filter={filter}
          />

          {!loading && (
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
          )}
          {loading ? <Spinner/>:null}
        </motion.div>
      </div>
    </div>
    </>
  );
}
