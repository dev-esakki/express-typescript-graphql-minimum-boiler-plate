import { gql } from 'apollo-server-express'


const userTypeDef = gql`    
    type User {
        id: ID!
        userName: String
        email: String
        status: ID
    }    

    input SignupInput {
        id: ID
        userName: String,
        email: String,
        password: String,
        status: ID
    } 
    
    input SignInUser {
        email: String,
        password: String,
    }

    type NotifySignin {
        email: String
        Msg: String
    }

    type Query {
        getUsers: [User]
    }
    
    type Mutation {
        signup(data: SignupInput): User
        signin(data: SignInUser): User
    } 

    type Subscription { 
        signinNotification(email: String): NotifySignin
     }
`
//signup(data: SignupInput): data

export default userTypeDef