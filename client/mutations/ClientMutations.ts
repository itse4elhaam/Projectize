import { gql } from "@apollo/client";

export const ADD_CLIENT = gql`
	mutation AddClient($name: String! $email: String! $phone: String!) {
		addClient(name: $name email: $email phone: $phone){
			id
			name
			email
			phone
	}
	} 
`;
export const DELETE_CLIENT = gql`
	mutation DeleteClient($id: String!) {
		deleteClient(id: $id) {
			id
			name
			email
			phone
		}
	}
`;
