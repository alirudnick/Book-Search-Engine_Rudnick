const express = require('express');
const path = require('path');
const { ApolloServer} = require('apollo-server-express');
const connect = require('./config/connection');
const routes = require('./routes');

//had a problem with proxy so here is cors 
const cors = require('cors');

// Define your GraphQL type definitions and resolvers here

const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const PORT = process.env.PORT || 3001;

//Allow cross-origin request
app.use(cors());


// Function to start the server
const startServer = async () => {
  // Wait for the ApolloServer to start
  await server.start();

  // Apply the ApolloServer middleware to the Express app
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // This line is to increase the timeout duration
app.timeout = 600000;

  // If we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);
 
  try {
    await connect();
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// Call the startServer function to start the server
startServer();