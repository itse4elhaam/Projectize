import {gql} from "@apollo/client"


export const GET_PROJECTS = gql `
    query getProjects{
        projects{
            id
            name 
            status
        }
    }
`

export interface projectType {
    id: string;
    name: string;
    description: string;
    status: "Not Started" | "In Progress" | "Completed";
}