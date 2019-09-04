import app from '../src/index';
import * as supertest from 'supertest';
/* describe('app', () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });
  it('should return a successful response for GET /', done => {
    request.get('/')
      .expect(200, done);
  });
}); */


describe('Name of the group', () => {
  test('should ', () => {
    'use strict' 
      
      const EasyGraphQLTester = require('easygraphql-tester')
      
      const schema = `
        type FamilyInfo {
          id: ID!
          isLocal: Boolean!
        }
      
        type Query {
          getFamilyInfoByIsLocal(isLocal: Boolean!): FamilyInfo
        }
      `
      
      const query = `
        query TEST($isLocal: Boolean!) {
          getFamilyInfoByIsLocal(isLocal: $isLocal) {
            id
            isLocal
          }
        }
      `
      
      function getFamilyInfoByIsLocal(__, args, ctx) {
        console.log(__)
        console.log(args)
        console.log(ctx)
        return {
          id: 1,
          isLocal: args.isLocal
        }
      }
      
      const resolvers = {
        Query: {
          getFamilyInfoByIsLocal    
        }
      }
      
      const tester = new EasyGraphQLTester(schema, resolvers)
      
      tester.graphql(query, {"parent":"test"}, {"db": "db"}, { isLocal: false })
        .then(result => console.log(result))
        .catch(err => console.log(err))
        /* tester.test(true, query, {
          isLocal: false
        }) */
  });
});