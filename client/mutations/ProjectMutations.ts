import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
	mutation AddProject(
		$name: String!
		$description: String!
		$status: String!
	) {
		addProject(name: $name, description: $description, status: $status) {
			id
			name
			description
			status
		}
	}
`;
export const DELETE_PROJECT = gql`
	mutation DeleteProject($id: String!) {
		deleteClient(id: $id) {
			id
			name
			description
			status
		}
	}
`;
