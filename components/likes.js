import styles from "../styles/components/likes.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import like from "../public/icons/like.png";
import likefilled from "../public/icons/likefilled.png";
import { motion } from "framer-motion";
import { LIKE_DELETE, LIKE_MUTATION, LIKE_QUERY } from "../lib/apollo";
import Notification from '../components/notification';
import { useEffect, useState } from "react";

const Likes = ({ id }) => {
  const { data: session, status } = useSession();
  const [showWarn, setShowWarn] = useState(false);

  const { loading, data, fetchMore, refetch } = useQuery(LIKE_QUERY, {
    variables: {
      article: id,
    },
  });

  const [
    createLike,
    {
      data: dataAftermutation,
      loading: loadingAfterMutation,
      error: errorAfterMutation,
    },
  ] = useMutation(LIKE_MUTATION, {
    //refetchQueries: [{query:COMMENTS_QUERY,variables:{article:id.id}}]
    variables: {
      article: id,
      user: session?.id,
    },
  });

  const idArray = data?.likes.data.map(
    (e) => +e.attributes.users_permissions_user?.data?.id
  );


  const putLike = () => {
    if(session){
      createLike().then(refetch);
    }else{
      setShowWarn(true)
    }
   
  };
  const removeLike = () => {
    deleteLike().then(refetch);
   
  };
  useEffect(()=>{
    setTimeout(()=>setShowWarn(false),5000)
  },[showWarn])

  const reducer = data?.likes?.data?.reduce((newArr, a) => {
    if (+a?.attributes?.users_permissions_user?.data?.id === session?.id) {
      newArr.push(a);
    }

    return newArr;
  }, []);

  const userLi = reducer;

  const [deleteLike] = useMutation(LIKE_DELETE, {
    //refetchQueries: [{query:LIKE_QUERY,variables:{article:id.id}}],
    variables: {
      id: userLi?.map((e) => +e.id)[0],
    },
  });

  return (
    <div style={{ marginLeft: "auto" }} className={styles.likeContainer}>
      {showWarn ? <Notification text="Вы должны зарегистрироваться"/>:null}
      {session ? (
        <button
          onClick={idArray?.includes(session?.id) ? removeLike : putLike}
          className={styles.likeButton}
        >
          <div className={styles.like}>
            <Image
              src={idArray?.includes(session?.id) ? likefilled : like}
              placeholder="blur"
              alt="иконка сердце"
              priority
              fill={true}
            />
          </div>
        </button>
      ) : (
        <button
          onClick={idArray?.includes(session?.id) ? removeLike : putLike}
          className={styles.likeButton}
         
        >
          <div className={styles.like}>
            <Image
              src={idArray?.includes(session?.id) ? likefilled : like}
              placeholder="blur"
              alt="иконка сердце"
              priority
              fill={true}
            />
          </div>
        </button>
      )}

      <p className={styles.smallText}>{data?.likes.data.length}</p>
    </div>
  );
};

export default Likes;
