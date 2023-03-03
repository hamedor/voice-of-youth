import styles from "../styles/components/commentList.module.css";

import {  useState, useEffect } from "react";
import CommentForm from "./commentForm";
import AnsweredComment from "./answeredComment";
import UserInfo from "./userInfo";



const TestCommentList = ({ data,handleChange, handleSubmit }) => {


  return data?.flatMap(e=>{
    return(

            <div key={e.id} className={styles.comment} style={{ marginLeft: "1rem" }}>
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
                        commentTime={true}/>
                </div>

                <div className={styles.textContainer}>
                    <p className={styles.text}>{e.attributes.text}</p>

                    <div className={styles.flex}>
                        <CommentForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        data={e}
                        firstComment={e.id}
                        nestLevel={1}
                        />
                    </div>
                </div>
               
                {e.attributes.comments_arrays.data.map(el=>{
                    return(
                        <div key={el.id} className={styles.comment}>
                            <div className={styles.flex}>
                            <UserInfo
                                avatar={
                                el.attributes.users_permissions_user.data?.attributes.avatar.data
                                    ?.attributes.url
                                }
                                id={el.attributes.users_permissions_user.data?.id}
                                firstName={
                                el.attributes.users_permissions_user.data?.attributes.firstName
                                }
                                lastName={
                                el.attributes.users_permissions_user.data?.attributes.lastName
                                }
                                date={el.attributes.createdAt}
                                commentTime={true}/>
                                </div>
                            <div className={styles.textContainer}>
                                

                                <AnsweredComment
                                    /* answeredComment={el.attributes.answeredComment} */
                                    answeredComment={el.attributes.answeredComment} 
                                    secondlvlComment={el.attributes.nestLevel===1 ? {data:[{id:e.id,attributes:{uid:e.attributes.uid,text:e.attributes.text,users_permissions_user:e.attributes.users_permissions_user}}]} : 
                                                    el.attributes.nestLevel===2 ? e.attributes.comments_arrays :null} 
                                />
                            
                                
                             <p className={styles.text}>{el.attributes.text}</p>


                               
                             

                                <div className={styles.flex}>
                                    <CommentForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    data={el}
                                    firstComment={e.id}
                                    nestLevel={2}
                                    />
                                </div>
                            </div>
                        </div>   
                    )
                })}
              </div>
      
    )
  })
};

export default TestCommentList;