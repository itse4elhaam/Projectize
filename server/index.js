import express from "express"
import { graphqlHTTP } from "express-graphql"
import schema from "./schema/schema.js";
import { connectDB } from "./config/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 8000

var app = express()

connectDB()

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
)
app.listen(PORT)
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`)