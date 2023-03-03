import styles from "../styles/components/comment.module.css";

import { useSession } from "next-auth/react";
import { COMMENTS_QUERY, COMMENT_MUTATION, COMMENT_ARRAY_MUTATION } from "../lib/apollo";
import {useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";


import Spinner from "./spinner";
import Notification from "./notification";
import CommentList from "./commentsList";

export const depthL = () => {
  return 3;
};

const Comment = (id) => {
  const [commentInput, setCommentInput] = useState();

  const { data: session, status } = useSession();

  const [commentsLengthWarn, setCommentLengthWarn] = useState(false);
  const [commentLength, setCommentLength] = useState(0);
  const [showWarnRegister, setShowWarnRegister] = useState(false);
  const [showWarnCount200, setShowWarnCount200] = useState(false);
  const [formFocused, setFormFocused] = useState(false);

  const {
    loading: loadingComments,
    data,
    fetchMore,
    refetch,
  } = useQuery(COMMENTS_QUERY, {
    variables: {
      article: +id.id,
      offset: 0,
      limit: 30,
    },
    fetchPolicy:"cache-first",

  });



  const [createComment, { data1, loading, error }] = useMutation(
    COMMENT_MUTATION,
    {
      onError: (err) => {
        console.log(err);
      },
      //refetchQueries: [{query:COMMENTS_QUERY,variables:{article:id.id}}]
    }
  );


  const [createCommentArray, { data2, loadin2, error2 }] = useMutation(
    COMMENT_ARRAY_MUTATION,
    {
      onError: (err) => {
        console.log(err);
      },
      //refetchQueries: [{query:COMMENTS_QUERY,variables:{article:id.id}}]
    }
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session) {
      if(commentInput.nestLevel===0){
        createComment({
          variables: {
            text: commentInput.comment,
            article: id.id,
            user: session.id,
           /*  answeredCommentId: commentInput.answeredCommentId, */
            nestLevel: commentInput.nestLevel,
          },
        }).then(refetch);
      }else{
        createCommentArray({
          variables: {
            text: commentInput.comment,
            article: id.id,
            user: session.id,
            answeredComment: commentInput.answeredCommentId,
            nestLevel: commentInput.nestLevel,
            firstComment:+commentInput.firstComment,
          },
        }).then(refetch);
      }
   
    }
  };
  const handleChange = (e, answeredCommentId, firstComment,nestLevel) => {
    if (!session) {
      setShowWarnRegister(true);
    }
    const { value } = e.target;

    setCommentLength(value.length);
    if (commentLength > 200) {
      setCommentLengthWarn(true);
      setShowWarnCount200(true);
    } else {
      setCommentLengthWarn(false);
    }
    
    setCommentInput({
      ...commentInput,
      comment: value,
      nestLevel,
      answeredCommentId,
      firstComment
    });
  };
  useEffect(() => {
    setTimeout(() => setShowWarnRegister(false), 5000);
  }, [showWarnRegister]);
  useEffect(() => {
    setTimeout(() => setShowWarnCount200(false), 5000);
  }, [showWarnCount200]);

  return (
    <section className={styles.comments}>
      {showWarnRegister ? (
        <Notification text={"Вы должны авторизоваться"} />
      ) : null}
      {showWarnCount200 ? (
        <Notification
          text={"Количество символов превышает максимально допустимое"}
        />
      ) : null}
      <h3 className={styles.title}>Комментарии</h3>
      {commentsLengthWarn ? (
        <p className={styles.warn}>Длина комментария превышает 200 символов</p>
      ) : null}
      {loading ? <Spinner /> : null}

      {!session && !loadingComments ? (
        <p className={styles.warn}>
          Зарегистрируйтесь, чтобы оставлять комментарии
        </p>
      ) : null}
      {loading ? <p>Пожалуйста подождите...</p> : null}

      <form  className={`${formFocused ? styles.leaveCommentOpen : styles.leaveComment}`} /* onBlur={()=>setFormFocused(false)} TODO */ onFocus={()=>setFormFocused(true)} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <textarea
            className={styles.leaveCommentInput}
           
            type="text"
            name="comment"
            placeholder=" Оставить комментарий (Максимум 200 символов)"
            onChange={(e, nestLevel = 0) =>
              handleChange(e, undefined,undefined, nestLevel)
            }
            
            required
          />
          {/*  <p className={`${commentsLengthWarn ? styles.warn : styles.commentLength}`}>{commentLength}/200</p>  TODO*/}
        </label>

        <button className={`${formFocused ? styles.leaveCommentButton : styles.leaveCommentButtonClose}`}>Опубликовать</button>
      </form>
      
      
      <CommentList
        data={data?.comments.data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />



    </section>
  );
};

export default Comment;
