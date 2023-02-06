import { useEffect, useRef, useState } from "react";

import { useQuery } from "@apollo/client";
import { ARTICLES_QUERY, CATEGORIES_QUERY } from "../lib/apollo";
import { useLazyQuery, NetworkStatus, fetchMoreOptions } from "@apollo/client";

const useInfinityLoading = (category, search, user) => {
  const [limit, setLimit] = useState(3);
  const [start, setStart] = useState(0);

  const { data, loading, error, fetchMore, refetch } = useQuery(
    ARTICLES_QUERY,
    {
      variables: {
        limit: 3,
        start: 0,
        user,
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    }
  );

/*   useEffect(()=>{
    console.log(loading)
    
    if(!data?.articles?.data && !loading){
      console.log(refetch)
    }

  },[data]) */

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

  return [data, loading, fetchInf, fetchMore, refetch, start];
};

export default useInfinityLoading;
