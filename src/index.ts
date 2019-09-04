/* Import Express */
import * as express from 'express';
import { Request, Response } from 'express';
import * as http from 'http';

/* Import Mongoose and connect to database */
import * as mongoose from 'mongoose'

/* Imported ApolloServer for Express */
import { ApolloServer } from 'apollo-server-express'

/* Imported executableSchema schemas from _graphqlHelper */
import executableSchema from './_helpers/_graphqlHelper'


/* Import Db schemas from _scheamaHub */
import { userModal, mapModal } from './_schemaHub'


/* create new Instance for Express */
const app = express();
const {
  PORT = 3000,
} = process.env; 


app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello world React',
  });
});



const Apollo = new ApolloServer({
  schema: executableSchema,
  context: ({req}) => {
    if (req) {
        return {
          userModal,  
          mapModal       
        }
    }
},
  playground: {
    settings: {
        "request.credentials": "include",
    },
  }
})

Apollo.applyMiddleware({
  app, 
  path: '/graphql'
});


var server = http.createServer(app);
Apollo.installSubscriptionHandlers(server);


if (require.main === module) {
  let ip:string = "192.168.0.161"
  server.listen(PORT, () => {
    console.log('server started at http://localhost:'+PORT);    
  });
}


const uri = "mongodb+srv://React:React@cluster0-yt5x8.mongodb.net/test?retryWrites=true&w=majority";

const connect = mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
connect.then(() => {
  console.log("MongoDB Connnected Successfully")
})
export default app;