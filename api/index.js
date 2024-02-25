const cors = require("cors");
const express = require("express")
const { WebSocketServer } = require('ws');
const { GraphQLSchema } = require("graphql");
const { useServer } = require('graphql-ws/lib/use/ws');
const { createHandler } = require('graphql-http/lib/use/express');

const { RootQueryType, RootMutationType, RootSubscriptionType } = require("./types");

// Create an Express instance
const app = express();

// Create graphql schema object
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
  subscription: RootSubscriptionType
});

// Enable Cross-Origin Resource Sharing (CORS) 
app.use(cors());

// Serve all methods on /graphql
// where the GraphQL over HTTP express request handler is
app.all('/graphql', createHandler({ schema }));

// Start the server
const server = app.listen(4000);

// Create a websocket server
const wsServer = new WebSocketServer({
  server,
  path: '/graphql',
});

// Start the websocket server
useServer({ schema }, wsServer); 