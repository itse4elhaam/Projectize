import { gql } from "@apollo/client";

// we will write the exact thing here that we write in the graphiql interface for testing
export const GET_CLIENTS = gql`
	query getClients {
		clients {
			id
			name
			email
			phone
		}
	}
`;

export type clientType = {
	__typename: string;
	id: string;
	name: string;
	email: string;
	phone: string;
};

