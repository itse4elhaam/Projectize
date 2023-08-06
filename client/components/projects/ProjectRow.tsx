import { projectType } from "src/queries/projectQueries";

export default function ProjectRow({name, description, status} : projectType){
    return (
        <div className="card border p-4 flex justify-around mx-12">
            <p>{name}</p>
            <p>{description}</p>
            <p>{status}</p>
        </div>
    )
}