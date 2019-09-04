import userResolvers from '../../../src/_graphqlModels/_users/resolvers'
import userModal from '../../../src/_dbModals/users'
import * as mongoose from 'mongoose'
const EasyGraphQLTester = require('easygraphql-tester')
import userTypeDef from '../../../src/_graphqlModels/_users/typeDef'



describe('Unit test for user Resolver', () => {

    beforeAll(() => {
        mongoose.connect("mongodb+srv://React:React@cluster0-yt5x8.mongodb.net/test?retryWrites=true&w=majority", {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
      });
    });
  
    let req;
    beforeEach(() => {
        req = { userModal }
        jest.setTimeout(10000);
    })

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    test('should ', async () => {
      const sendQuery = `query {
        getUsers {
          userName
          status
          email
        }
      }`
      const tester = await new EasyGraphQLTester(userTypeDef, userResolvers)      
      tester.graphql(sendQuery, {}, req, {}) //query, parent, db, args
      .then(result => {
        console.log(result)
        console.log(result.data.getUsers[0])
        expect(result.data.getUsers[0]).toMatchObject({
          userName: expect.any(String),
          email: expect.any(String),
          status: expect.any(Number),
      })
      })
      .catch(err => console.log(err))
    });
      
    /* test('Query GetAllUsers using promise',   () => {                         
          return userResolvers.Query.getUsers('','', req)
          .then(result => {
            console.log(result)
            expect(result[0]).toMatchObject({
              userName: expect.any(String),
              email: expect.any(String),
              status: expect.any(Number),
              password: expect.any(String),
            })
          }).catch(err => {
            console.log(err)
          })      
    }); */

    test('Query GetAllUsers using async ', async () => {
      const userArray =  await userResolvers.Query.getUsers('','', req)   
      console.log(userArray[0])     
        expect(userArray[0]).toMatchObject({
            userName: expect.any(String),
            email: expect.any(String),
            status: expect.any(Number),
            password: expect.any(String),
        })
    });

    test('Mutation for signup async ', async () => {
      try {
        const userData = { 
          data : {
            "id": 1,
            "userName": "test12",
            "password": "React2@123#",
            "email": "validate12@gmail.com",
            "status": 0
          }
        }
        const userInput = await userResolvers.Mutation.signup('',userData, req) 
        expect(userInput).toMatchObject({
          userName: expect.any(String),
          email: expect.any(String),
          status: expect.any(Number),
          password: expect.any(String),
        }) 
      } catch (e) {
        console.log(e)
      }
    });    

    test('Mutation for signin async  ', async() => {
        try {
          const userData =  {
            data : {
              email : "validate12@gmail.com",
              password: "React2@123#"
            }
          }
          const userInput = await userResolvers.Mutation.signin('',userData, req) 
          expect(userInput).toMatchObject({
            email: expect.any(String),
            password: expect.any(String)
          })
        } catch (e) {
          console.log(e)          
        }
    });
});