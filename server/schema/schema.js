// this is the boiler plate code for graph ql where we define all of the templates and Schema for the data we wil be fetching 

import { projects, clients } from "../sampleData.js";

import { GraphQLList, GraphQLSchema, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

// Client Type, this helps us alot a schema type to all of the fields that we are using
const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

// we define the query that we'll be able to make from the front end using apollo client, resolve is a function that we can ues to fetch any client using their ids

// we can define all of the available data we will send by using the fields object
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return clients;
            }
        },  
		client: {
			type: ClientType,
			args: {
				id: { type: GraphQLID },
			},
            resolve(parent, args){
                return clients.find(client => client.id === args.id)
            }
		},
	},
});


export default new GraphQLSchema({
    query: RootQuery,
})