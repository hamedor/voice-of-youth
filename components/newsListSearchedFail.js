import styles from "../styles/components/newsListSearchedFail.module.css";

const NewsListSearchedFail = ({setSearch, setSelected, setCategory, filter}) => {

  const getBack = () =>{
    setSelected('Все новости');
    setCategory('')
    setSearch('')
  }
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Нет такого поста</h2>
      <p className={styles.text}>
        Мы посмотрели везде, но увы... Может быть, измените поисковый запрос?
      </p>

      <button onClick={()=>filter()} className={styles.button}>
        Вернуться к постам
      </button>
    </div>
  );
};
export default NewsListSearchedFail;
