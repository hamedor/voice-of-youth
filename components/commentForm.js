import styles from "../styles/components/commentForm.module.css";
import { useEffect, useState } from "react";

const CommentForm = ({ handleSubmit, handleChange, data, firstComment,nestLevel}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const [commentsLengthWarn, setCommentLengthWarn] = useState(false);
  const [commentLength, setCommentLength] = useState(0);

  const commentClassToggle = (e) => {
    e.preventDefault();
    setIsCommentOpen((prev) => !prev);
  };

  const valid = (event) => {
    const { value } = event.target;
  };

  return (
    <>
        <div className={styles.commentForm}>
          <button
            onClick={commentClassToggle}
            className={`${
              !isCommentOpen ? styles.formButton : styles.formClose
            }`}
          >
            Ответить
          </button>
          <form
            onSubmit={handleSubmit}
            className={`${isCommentOpen ? styles.formOpen : styles.formClose}`}
          >
            <label className={styles.label}>
              <textarea
                className={styles.input}
                type="text"
                name="comment"
                placeholder=" Ответить (Максимум 200 символов)"
                onChange={(event) => [
                  handleChange(event, data.attributes.uid,firstComment,nestLevel),
                  () => valid(event),
                ]}
                required
              />
            </label>
            <div className={styles.flex}>
              <button className={styles.button}>Опубликовать</button>
              <button className={styles.button} onClick={commentClassToggle}>
                Отменить
              </button>
            </div>
          </form>
        </div>
    </>
  );
};

export default CommentForm;
