const {ApolloServer} = require('apollo-server-lambda');

const {schema} = require('./schema');
const {resolvers} = require('./resolvers');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  formatResponse: (response) => {
    return response;
  },
  context: ({event, context}) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  playground: {
    endpoint: 'http://localhost:5000/graphql',
  },
  tracing: true,
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
  },
});
