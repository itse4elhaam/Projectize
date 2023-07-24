import express from "express"
import { graphqlHTTP } from "express-graphql"
import schema from "./schema/schema.js";
import "dotenv/config";

const PORT = process.env.PORT || 8000

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!"
  },
}

var app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
)
app.listen(PORT)
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)