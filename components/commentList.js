import styles from "../styles/components/commentList.module.css";
import Link from "next/link";
import Image from "next/image";
import Time from "./Time";
import { useEffect, useState } from "react";
import CommentForm from "./commentForm";
import UserInfo from "./userInfo";

const CommentRecursive = ({ data, handleChange, handleSubmit }) => {
  const [count, setCount] = useState(0);

  const [testId, setTestId] = useState([]);

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const commentOpenTree = (e) => {
    setTestId((old) => [...old, e]);
  };

  const commentCloseTree = (e) => {
    const arr = testId.filter((item) => item !== e);
    setTestId(arr);
  };

  const CommentsLength = ({ data }) => {
    let count = -1;

    const recursion = (data) => {
      const trigger = data.flatMap((e) => e.attributes.comments.data.length);

      if (trigger !== 0) {
        count += data.length;

        const nest = data.flatMap((e) => e.attributes.comments.data);

        if (trigger === 0 || trigger.length === 0) {
          return;
        }

        recursion(nest);
      }
    };

    recursion(data);

    return count;
  };

 
  return data?.flatMap((e) => {
    return (
      <div key={e.id} className={styles.comment} style={{ marginLeft: "1rem" }}>
      {/*   {e.attributes.comments.data?.length && testId.includes(e.id) ? (
          <div className={styles.hrwrap}>
            <span className={styles.triangle}></span>
            <span className={styles.hr}>Jump to comment-1</span>
          </div>
        ) : null} TODO */}

        <div className={styles.flex}>
          <UserInfo
            avatar={
              e.attributes.users_permissions_user.data?.attributes.avatar.data
                ?.attributes.url
            }
            id={e.attributes.users_permissions_user.data?.id}
            firstName={
              e.attributes.users_permissions_user.data?.attributes.firstName
            }
            lastName={
              e.attributes.users_permissions_user.data?.attributes.lastName
            }
            date={e.attributes.createdAt}
            commentTime={true}
          />

        
        </div>
        <div className={styles.textContainer}>
          <p className={styles.text}>{e.attributes.text}</p>

          <div className={styles.flex}>
            <CommentForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              data={e}

            />

            {e.attributes.nestLevel === 1 &&
            e.attributes.comments.data?.length &&
            !testId.includes(e.id) ? (
              <div className={styles.container}>
                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => commentOpenTree(e.id)}
                  className={styles.formButton}
                >
                  Показать ветку
                </button>{" "}
                <p className={styles.length}>
                  {" "}
                  (<CommentsLength data={[e]} />)
                </p>
              </div>
            ) : null}
            {testId.includes(e.id) ? (
              <button
                style={{ marginLeft: 10 }}
                onClick={() => commentCloseTree(e.id)}
                className={styles.formButton}
              >
                Скрыть ветку
              </button>
            ) : null}
          </div>
        </div>

        {(e.attributes.comments.data?.length && testId.includes(e.id)) ||
        e.attributes.nestLevel !== 1 ? (
          <CommentRecursive
            data={e.attributes.comments.data}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : null}

        {e.attributes.comment ? (
          <div>
            {test.map((e) => {
              return (
                <div key={e.id}>
                  <p>{e.attributes.text}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  });
};

const CommentList = ({ data, handleChange, handleSubmit }) => {
  return (
    <>
      <CommentRecursive
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CommentList;
