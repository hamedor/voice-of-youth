

const AnsweredComment= ({ answeredComment, firstlvlComment,secondlvlComment}) => {

    const filtered = secondlvlComment.data.filter(e=>e.attributes.uid===answeredComment)

    return(
        <div>
            {filtered.map(el=>
            <div key={el.id}>
                <p>{el.attributes.users_permissions_user.data.attributes.firstName}</p>
                <p>{el.attributes.users_permissions_user.data.attributes.lastName}</p>
                <p>{el.attributes.text}</p>
            </div>
            )} 
        </div>
    )

};
export default AnsweredComment;