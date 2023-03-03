import { ApolloClient, ApolloLink,createHttpLink, HttpLink,SchemaLink,InMemoryCache, gql} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';



/* const link = createHttpLink({
  
  uri: 'http://localhost:1338/graphql',
  credentials: 'include'
}); */

const client = new ApolloClient({
   uri: "http://localhost:1338/graphql", 
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
        previewText
        views
        previewImage{
          data{
            attributes{
              url
            }
          }
        }
        comments{
          data{
            id
            attributes{
              comments_arrays{
                data{
                  id
                }
              }
            }
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

export const ARTICLE_QUERY = gql`
query Articles($id:ID, $search:String){
  articles(filters: {id:{eq:$id}, or:[{text:{containsi:$search}},{title:{containsi:$search}}]}){
    data{
      id
      attributes{
        title
        date
        text
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
`

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
query users($id:ID){
  usersPermissionsUsers(filters:{id:{eq:$id}}){
    data{
      id
      attributes{
        username
        firstName
        inTeam
        base64
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
mutation comments($text:String, $article:ID, $user:ID! ,$nestLevel:Int){
	createComment(data: {text : $text, article: $article, users_permissions_user: $user, ,nestLevel: $nestLevel}){
    data{
      attributes
      {
        text
        article{
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

export const COMMENT_ARRAY_MUTATION = gql`
mutation commentsArrays($text:String, $article:ID, $user:ID! ,$nestLevel:Int, $answeredComment:String!, $firstComment:ID!){
	createCommentsArray(data: {text : $text, article: $article, users_permissions_user: $user, nestLevel: $nestLevel, answeredComment: $answeredComment, comment:$firstComment}){
    data{
      attributes
      {
        text
        article{
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

export const USERAVATAR_MUTATION = gql`
  mutation($file: Upload!) {
    upload(file: $file) {
      data{
        id
        attributes{
          name
          alternativeText
        }
      }
    }
  }
`

export const COMMENTS_QUERY = gql`
  query comments($article:ID) {
    comments(filters:{article:{id:{eq:$article}}}) {
      data {
        id
        attributes {
          uid
          text
          createdAt
          nestLevel
          article {
            data {
              id
            }
          }
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
          like
          date
          comments_arrays{
            data{
              id
              attributes{
                text
                uid
                createdAt
                answeredComment
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