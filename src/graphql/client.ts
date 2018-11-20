import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8888/graphql',
});

export default apolloClient;
