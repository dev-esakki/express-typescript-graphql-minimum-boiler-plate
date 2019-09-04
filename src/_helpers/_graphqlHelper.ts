import { makeExecutableSchema } from 'apollo-server'
import { mergeResolvers } from 'merge-graphql-schemas'

/* Import typeDefs for Graphql from  _graphqlModels*/
import userTypeDef  from '../_graphqlModels/_users/typeDef'
import mapTypeDef from '../_graphqlModels/_maps/typeDef'

/* Import Resolvers for Graphql from  _graphqlModels*/
import userResolvers from '../_graphqlModels/_users/resolvers'
import mapResolver from '../_graphqlModels/_maps/resolvers'

const executableSchema = makeExecutableSchema({
    typeDefs: [
        userTypeDef,
        mapTypeDef
    ],
    resolvers: mergeResolvers([
        userResolvers,
        mapResolver
    ])
})

export default executableSchema