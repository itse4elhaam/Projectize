"use client";

import { useQuery} from "@apollo/client";
import { GET_CLIENTS, clientType } from "src/queries/clientQueries";
import ClientRow from "./ClientRow";

export default function Clients() {
	const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading)
		return (
			<span className="animate-pulse text-lg mx-auto text-gray-700">
				Loading...
			</span>
		);
    if (error)
		return (
			<span className="text-red-500 font-bold text-lg text-center">
				ERROR!
			</span>
		);
	return (
		<>
			{!loading &&
				!error &&
				data.clients.map(
					(client: clientType) =>
						< ClientRow key={client.id} {...client}/>
				)}
		</>
	);
}
