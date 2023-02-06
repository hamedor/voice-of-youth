import { ApolloClient, InMemoryCache, gql} from "@apollo/client";



const client = new ApolloClient({
    uri: "http://85.193.90.17:1338/graphql",
    
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields:{
            articles:{          
              keyArgs: [],
              merge:true
          },
          usersPermissionsUsers:{
            keyArgs:[],
            merge:true,
          },
          
      }
      }
    }
  }),
 
  connectToDevTools: true,
  
})




export default client;


export const CATEGORIES_QUERY = gql`
query categories{
  categories{
		data{
      id
      attributes{
        name
          }
        }
      }
    } 
    
`;


export const ARTICLES_QUERY = gql` 
query Articles($limit:Int, $start:Int,  $filters:String, $id:ID, $search:String, $user:ID){
  articles(sort:"date:desc",pagination:{limit:$limit, start: $start}, filters:  {id:{eq:$id}, category:{name:{eq:$filters}},or:[{text:{containsi:$search}},{title:{containsi:$search}}],  users_permissions_user:{id:{eq:$user}}}){
    data{
      id
      attributes{
        title
        date
        createdAt
        text
        previewText
        views

        previewImage{
          data{
            attributes{
              url
            }
          }
        }
        comments (pagination: { limit: 100 }){
          data{
            id
          }
        }
        category{
          data{
            id
            attributes{
              name
            }
          }
        }
        users_permissions_user{
          data{
            id
            attributes{
              firstName
              lastName
              username
              avatar{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
        likes{
          data{
            attributes{
              users_permissions_user{
                data{
                id
               
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const TEAM_QUERY = gql`
query users{
  usersPermissionsUsers(filters: { inTeam: { eq: true }}){
    data{
      id
      attributes{
        firstName
        lastName
        inTeam
        avatar{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
  }
}
`;
export const USERS_QUERY = gql`
query users{
  usersPermissionsUsers{
    data{
      id
      attributes{
        username
        firstName
        inTeam
        avatar{
          data{
            attributes{
              url
            }
          }
        }
        comments{
          data{
            attributes{
              text
            }
          }
        }
      
      }
    }
  }
}
`;


const CORE_COMMENT_FIELDS = gql`

fragment CoreCommentFields on Comment{
  
  text
  createdAt
  nestLevel
  users_permissions_user{
    data{
      id
      attributes{
        username
        firstName
        lastName
        avatar{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
  }
  comments{
    data{
      attributes{
        text
        nestLevel
        users_permissions_user{
          data{
            id
            attributes{
              username
              firstName
              lastName
              avatar{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }

}

`;

const RECURSIVE = gql `
${CORE_COMMENT_FIELDS}
fragment Recursive on Comment {
  comments {
    data {
      id
      attributes {
        ...CoreCommentFields
        comments {
          data {
            id
            attributes {
              ...CoreCommentFields
              comments {
                data {
                  id
                  attributes {
                    ...CoreCommentFields
                    comments {
                      data {
                        id
                        attributes {
                          ...CoreCommentFields
                          comments {
                            data {
                              id
                              attributes {
                                ...CoreCommentFields
                                comment {
                                  data {
                                    id
                                    attributes {
                                      ...CoreCommentFields
                                      comment {
                                        data {
                                          id
                                          attributes {
                                            ...CoreCommentFields
                                            comment {
                                              data {
                                                id
                                                attributes {
                                                  ...CoreCommentFields
                                                  comment {
                                                    data {
                                                      id
                                                      attributes {
                                                        ...CoreCommentFields
                                                        comment {
                                                          data {
                                                            id
                                                            attributes {
                                                              ...CoreCommentFields
                                                              comment {
                                                                data {
                                                                  id
                                                                  attributes {
                                                                    ...CoreCommentFields
                                                                    comment {
                                                                      data {
                                                                        id
                                                                        attributes {
                                                                          ...CoreCommentFields
                                                                          comment {
                                                                            data {
                                                                              id
                                                                              attributes {
                                                                                ...CoreCommentFields
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const COMMENTS_QUERY = gql`
${CORE_COMMENT_FIELDS, RECURSIVE}
query comments($article:ID, $limit:Int){
	comments(pagination:{limit:$limit},filters:{articles:{id:{eq:$article}}, nestLevel:{eq:1}}){
    data{
      id
      attributes{
          ...CoreCommentFields
      		...Recursive
        }
      }
    }
  }
`;


export const REGISTER_MUTATION = gql`
mutation register($username: String!, $email:String!, $password: String!, $firstName:String, $lastName:String){
  register(input: { username: $username, email: $email, password: $password,firstName:$firstName, lastName:$lastName}){
    jwt
    user{
      username
      email
      id
      lastName
    }
  }
}
`;
export const COMMENT_MUTATION = gql`
mutation comment($text:String, $articles:[ID], $user:ID!, $answeredCommentId:ID ,$nestLevel:Int){
	createComment(data: {text : $text, articles: $articles, users_permissions_user: $user, comment:$answeredCommentId ,nestLevel: $nestLevel}){
    data{
      attributes
      {
        text
        articles{
          data{
            id
          }
        }
        users_permissions_user{
          data{
            id
            
          }
        }
      }
    }
  }
}
`;


export const LIKE_QUERY= gql`
query like($article:ID) {
  likes(filters:{article:{id:{eq:$article}}}) {
     data {
       id
       attributes {
         users_permissions_user {
           data {
             id
           }
         }
         article {
           data {
             id
           }
         }
       }
     }
   }
 }
`

export const LIKE_MUTATION= gql`
mutation like($article:ID, $user:ID) {
  createLike(data: { article: $article, users_permissions_user: $user }) {
    data {
      id
      attributes {
        users_permissions_user {
          data {
            id
          }
        }
        article {
          data {
            id
          }
        }
      }
    }
  }
}
`
export const LIKE_DELETE= gql`
mutation deleteLike($id:ID!) {
  deleteLike(id:$id) {
    data {
      id
      attributes {
        users_permissions_user {
          data {
            id
          }
        }
        article {
          data {
            id
          }
        }
      }
    }
  }
}

`




  /*mutation comment($text: String!, $articles: [ID], $users_permissions_user: ID!){
	createComment(data: {text : $text, articles: $articles, users_permissions_user: $users_permissions_user}){
    data{
      attributes
      {
        text
        articles{
          data{
            id
          }
        }
        users_permissions_user{
          data{
            id
            
          }
        }
      }
    }
  }
}






export const COMMENTS_QUERY = gql`
query comments($article:ID){
  comments(filters:{articles:{id:{eq:$article}}, nestLevel:{eq:1}}){
		data{
      id
      attributes{
        text
        createdAt
        nestLevel
        users_permissions_user{
          data{
            id
            attributes{
              username
              firstName
              lastName
              avatar{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
        comment{
          data{
            attributes{
              text
              createdAt
              nestLevel
              users_permissions_user{
                data{
                  id
                  attributes{
                    username
                    firstName
                    lastName
                    avatar{
                    data{
                      attributes{
                        url
                      }
                    }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

   
        }*/