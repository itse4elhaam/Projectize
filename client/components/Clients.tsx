"use client";

import { useQuery} from "@apollo/client";
import { GET_CLIENTS, clientType } from "src/queries/clientQueries";
import ClientRow from "./ClientRow";

export default function Clients() {
	const { loading, error, data } = useQuery(GET_CLIENTS);

	if (loading) return <p className="animate-pulse">Loading...</p>;
	if (error) return <p className="font-6xl text-red-600">Error</p>;
	return (
		<>
			{!loading &&
				!error &&
				data.clients.map(
					(client: clientType) =>
						// TODO:use components here
						< ClientRow key={client.id} id={client.id} name={client.name} phone={client.phone} email={client.email}/>
				)}
		</>
	);
}
