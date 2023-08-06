"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "src/mutations/ClientMutations";
import { GET_CLIENTS } from "src/queries/clientQueries";
import { clientType } from '../../queries/clientQueries';


export default function ClientForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
 
    // these options can also be set directly while calling the function but I think its better to do it here so that we can cal it over there and maintain a layer of abstraction, makes the code more readable

    // in the update function, we're basically using cache to fetch the current data by reading it and we're then later on using write query method to update it
	const [addClient, { loading, error }] = useMutation(ADD_CLIENT, {
		variables: { name, email, phone },
		update: (cache, { data: { addClient } }) => {
			const { clients } = cache.readQuery({
				query: GET_CLIENTS,
			}) as { clients: clientType[] };

			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] },
			});
		},
	});


    //  update function here makes sure we can give real time updates to the UI
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await addClient();


			setName("");
			setEmail("");
			setPhone("");
		} 
        catch (error: any) {
			console.error("Error adding client:", error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 mx-10">
            <h1 className="my-4 mt-8 text-3xl font-bold text-center">Add a Client</h1>
			<div>
				<label htmlFor="name" className="block font-medium">
					Name
				</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="block w-full border border-gray-300 rounded-md p-2"
					required
				/>
			</div>
			<div>
				<label htmlFor="email" className="block font-medium">
					Email
				</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="block w-full border border-gray-300 rounded-md p-2"
					required
				/>
			</div>
			<div>
				<label htmlFor="phone" className="block font-medium">
					Phone
				</label>
				<input
					type="tel"
					id="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					className="block w-full border border-gray-300 rounded-md p-2"
					required
				/>
			</div>
			<div>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
					disabled={loading}
				>
					{loading ? "Submitting..." : "Submit"}
				</button>
			</div>
			{error && <p className="text-red-600">{error.message}</p>}
		</form>
	);
}
