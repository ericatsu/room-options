const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolver = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors()); 

app.use(isAuth);

app.use('/graphql', graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolver,
  graphiql: true,
}));

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(8000);
}).catch(err => {
  console.log(err);
});
