"use client"
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "src/queries/projectQueries";
import { projectType } from "src/queries/projectQueries";
import ProjectRow from "./ProjectRow"


export default function Projects(){
    const {loading, error, data} = useQuery(GET_PROJECTS)


    if (loading) return <span className="animate-pulse text-lg mx-auto text-gray-700">Loading...</span>;
    
    if (error) return <span className="text-red-500 font-bold text-lg mx-auto">ERROR!</span>

    return (
        <div className="my-8">

           {data.projects.length > 0 ?  data.projects.map((project: projectType) => (
                <ProjectRow key={project.id} {...project} />
           )) : <p>No Projects Yet</p>}
        </div>
    )
}