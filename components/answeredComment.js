import styles from '../styles/components/answeredComment.module.css';

const AnsweredComment= ({ answeredComment, secondlvlComment}) => {

    const filtered = secondlvlComment.data.filter(e=>e.attributes.uid===answeredComment)

    return(
        <div>
            {filtered.map(el=>
            <div className={styles.answered} key={el.id}>
                <div className={styles.flex}>
                    <p>ОТВЕТ </p>
                    <p>{el.attributes.users_permissions_user.data.attributes.firstName}</p>
                    <p>{el.attributes.users_permissions_user.data.attributes.lastName}</p>
                </div>
                    <p>{el.attributes.text}</p>
            </div>
            )} 
        </div>
    )

};
export default AnsweredComment;