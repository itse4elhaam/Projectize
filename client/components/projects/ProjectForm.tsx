"use client";

import ProjectStatusSelect, { statusType } from "./ProjectStatusSelection";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECTS, projectType } from "src/queries/projectQueries";
import { ADD_PROJECT } from "src/mutations/ProjectMutations";
import { statuses } from "./ProjectStatusSelection";
import ProjectClientSelect from "./ProjectClientSelection";

export default function ProjectForm() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState<statusType>(statuses[0]);
	const [client, setClient] = useState({id: "", name:""})

	// we're basically updating cache based on the previous cache
	const [addProject, { loading, error }] = useMutation(ADD_PROJECT, {
		variables: { name, description, status },
		update: (cache, { data: { addProject } }) => {
			const { projects } = cache.readQuery({
				query: GET_PROJECTS,
			}) as { projects: projectType[] };

			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] },
			});
		},
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await addProject();

			setName("");
			setDescription("");
			setStatus(statuses[0]);
		} catch (error: any) {
			console.error("Error adding client:", error.message);
		}
	};


	function setStatusThroughComponent(status: statusType){
		setStatus(status);
	}
	function setClientThroughComponent(id: string,name: string){
		setClient({
			id, name
		})
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 mx-10 my-16">
			<h1 className="my-4 mt-8 text-3xl font-bold text-center">
				Add a Project
			</h1>
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
				<label htmlFor="description" className="block font-medium">
					Description
				</label>
				<input
					type="description"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="block w-full border border-gray-300 rounded-md p-2"
					required
				/>
			</div>
			<div className="status-selection-wrapper w-1/3">
				<ProjectStatusSelect
					selectionHandler={setStatusThroughComponent}
				/>
			</div>
			<div className="status-selection-wrapper w-1/3">
				<ProjectClientSelect
					clientSelectionHandler={setClientThroughComponent}
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
