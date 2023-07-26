"use client";

import { GET_CLIENTS } from "src/queries/clientQueries";
import { DELETE_CLIENT } from "../mutations/ClientMutations";
import { useMutation } from "@apollo/client";
import { clientType } from '../queries/clientQueries';

type ClientProps = {
	id: string;
	name: string;
	email: string;
	phone: string;
};

export default function ClientRow({ id, name, email, phone }: ClientProps) {
	const [deleteClient ] = useMutation(DELETE_CLIENT, {
		refetchQueries: [{query: GET_CLIENTS}], // DOING THIS TOO MUCH MIGHT BOG DOWN YOUR APP


		// ? why is this not working?
		// update(cache, { data: { deleteClient  } }) {
		// 	const { clients } = cache.readQuery({ query: GET_CLIENTS });
		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		data: {
		// 			clients: clients.filter(
		// 				(client: clientType) => client.id !== deleteClient.id
		// 			),
		// 		},
		// 	});
		// },
	});


	// ? why is this working and the previous way wasn't working 

	async function handleDelete(id: string) {
		try {
			const { data } = await deleteClient({ variables: { id } });

			console.log("Deleted: ", data)
		} catch (error: any) {
			console.error("Failed to delete client:", error.message);
		}
	}

	return (
		<div className="px-4 mx-6 my-4 py-6 bg-white border-2 border-black rounded-lg shadow-lg flex justify-between">
			<h1>{name}</h1>
			<h1>{email}</h1>
			<h1>{phone}</h1>
			<button
				onClick={() => handleDelete(id)}
				className="px-4 py-2 cursor-pointer transition-colors duration-300 font-semi-bold bg-purple-60 bg-purple-600 text-white flex space-x-1 rounded-lg hover:bg-purple-950"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</button>
		</div>
	);
}
