import {
	GraphQLList,
	GraphQLSchema,
	GraphQLID,
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLEnumType,
} from "graphql";
import { ProjectModel } from "../models/Project.js";
import { ClientModel } from "../models/Client.js";
import { assertValidExecutionArguments } from "graphql/execution/execute.js";

// this is the boiler plate code for graph ql where we define all of the templates and Schema for the data we wil be fetching

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

// Project Type
const ProjectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return ClientModel.findById(parent.clientId);
			},
		},
	}),
});

// we define the query that we'll be able to make from the front end using apollo client, resolve is a function that we can ues to fetch any client using their ids

// we can define all of the available data we will send by using the fields object
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return ProjectModel.find();
			},
		},
		project: {
			type: ProjectType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return ProjectModel.findById(args.id);
			},
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return ClientModel.find();
			},
		},
		client: {
			type: ClientType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return ClientModel.findById(args.id);
			},
		},
	},
});

// used to mutate/change data
const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addClient: {
			type: ClientType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString) },
				phone: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const client = new ClientModel({
					name: args.name,
					email: args.email,
					phone: args.phone,
				});

				return client.save();
			},
		},
		deleteClient: {
			type: ClientType,
			args: {
				id: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				return ClientModel.findByIdAndRemove(args.id);
			},
		},
		addProject: {
			type: ProjectType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLNonNull(GraphQLString) },
				status: {
					type: new GraphQLEnumType({
						name: "ProjectStatus",
						values: {
							New: { value: "Not Started" },
							Progress: { value: "In Progress" },
							Completed: { value: "Completed" },
						},
					}),
				},
				clientId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const project = new ProjectModel({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId,
				});

				return project.save();
			},
		},
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return ProjectModel.findByIdAndRemove(args.id);
			},
		},
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				status: {
					type: new GraphQLEnumType({
						name: "UpdatedProjectStatus",
						values: {
							New: { value: "Not Started" },
							Progress: { value: "In Progress" },
							Completed: { value: "Completed" },
						},
					}),
				},
			},
			resolve(parent, args) {
				return ProjectModel.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							description: args.description,
							status: args.status,
						},
					},
					{ new: true }
				);
			},
		},
	},
});

export default new GraphQLSchema({
	query: RootQuery,
	mutation,
});
