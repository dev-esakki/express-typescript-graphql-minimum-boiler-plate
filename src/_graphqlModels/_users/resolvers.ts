import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server'
import * as Joi from '@hapi/joi'
import { PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = '';


interface signupInterface {
    data : { 
        id: number
        userName : string
        email : string
        password: string
        status : number 
    }
}

interface signinInterface {
   data :  {
       email: string
        password: string
    }
}

interface NotifyPayLoad {
    signinNotification : {
        email: string
        Msg: string
    }
}

interface NotifyVariable {
    email: string
}

const signupPattern = Joi.object().keys({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/),
    id:  Joi.number(),
    status: Joi.number(),
    email: Joi.string().email({ minDomainSegments: 2 }).required()
})

const signinPattern = Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required()
})

const userResolvers = {
    Query: {
        getUsers: async (_, args, { userModal }) => { 
                const Users = await userModal.find({});
                return Users;        
        } 
    },
    Mutation: {
        signup: async (_,  { data }: signupInterface  ,{ userModal }) => {
            //const a = JSON.parse(JSON.stringify(data));
            //console.log(data)
            const result = Joi.validate(data, signupPattern);
            if(result.error === null) {                
                let userExist = await userModal.findOne({email: data.email})
                if(userExist) {
                    throw new UserInputError('User Already Exist');
                } else {
                    let user = await userModal.create(data);      
                    return user
                }                
            } else {
                throw new UserInputError('Please Enter Valid Inputs');
            }
        },
        signin: async(_, { data }: signinInterface, { userModal }) => {
            let userInput = {
                email : data.email,
                password: data.password
            }
            const result = Joi.validate(data, signinPattern);
            if(result.error === null) {
                const userExist = await userModal.findOne(userInput)
                if(!userExist) throw new ForbiddenError('User Not Found');
                const signinNotification = { email: data.email, Msg: "" };
                pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, { signinNotification });
                return userExist;
            } else {
                throw new UserInputError('Please Enter Valid Inputs');
            }
        }
    },
    Subscription: {
        /* signinNotification: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC)
        }, */
        signinNotification: {
            subscribe: withFilter(() => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC), (payload: NotifyPayLoad,variables: NotifyVariable) => {                              
               return payload.signinNotification.email === variables.email;
            }),
        },
    }
}

export default userResolvers