import { useSession, signOut, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/pages/profile.module.css";
import {
  USERS_QUERY,
  USERAVATAR_MUTATION,
} from "../../lib/apollo";
import { useQuery, useMutation}
  from "@apollo/client";
export default function Profile() {
  const { data: session, status } = useSession();
  
  console.log(session)

  const [id, setId] = useState();
  useEffect(()=>{
    setId(session?.id)
  },[session])
  
  const user = useQuery(USERS_QUERY,{
    variables:{
       id
    }
  });

  const [userInputImage, setUserInputImage] = useState();



  const handleImageChange = (e) => {
    /* console.log(e.target.files[0]) */
    setUserInputImage(e.target.files[0]);
    
  };
useEffect(()=>{
  console.log(userInputImage)
},[userInputImage])
 


  const [updateAvatar, { data, loading, error }] = useMutation(USERAVATAR_MUTATION, {
    onError: (err) => {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateAvatar({
      variables:{
        file:userInputImage
      }
    })

    if (!error) {
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };



  return (
    <>
      {session && (
        <div className={styles.profile}>
          <h2 className={styles.title}>Профиль(Страница в разработке)</h2>

         
          <div className={styles.avatar}>
            {user?.data?.usersPermissionsUsers?.data?.map(e=>{
              return(
                
                <Image
                key={e.id}
                src={`http://85.193.90.17:1338${e.attributes.avatar.data.attributes.url}`}
                alt="Аватар"
                fill={true}
              />
              )
            })}
          
            
          </div> 
          <form onSubmit = {handleSubmit} className={styles.form}>
          <input 
                /* value={userInputImage} */
                onChange={handleImageChange}      
                type='file'
                placeholder='Загрузить аватар'
                className={styles.input}
           >
             </input>
             <button type='submit'>Сохранить</button>
          </form> 
  

          <div className={styles.flex}>
          <p className={styles.text}>Электронная почта: </p>
          <p className={styles.text}>{session.user.email}</p>
          <button className={styles.button}>Изменить</button>
          </div>
          <div className={styles.flex}>
          <p className={styles.text}>Имя: </p>
          <p className={styles.text}> {session.user.firstName}</p>
          <button className={styles.button}>Изменить</button>
          </div>
          <div className={styles.flex}>
          <p className={styles.text}>Фамилия:  </p>
          <p className={styles.text}>{session.user.lastName}</p>
          <button className={styles.button}>Изменить</button>
          </div>
          <div className={styles.flex}>
          <p className={styles.text}>Имя пользователя: </p>
          <p className={styles.text}>
             {session.user.username}
          </p>
          <button className={styles.button}>Изменить</button>
          </div>

        </div>
      )}
      {!session && <p>Вы не вошли</p>}
    </>
  );
}
