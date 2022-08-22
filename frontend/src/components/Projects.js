import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
    console.log(project.id)
    return (
        <tr>
            <td>
               <Link to={`${project.id}`}> {project.title} </Link>
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
            <table>
                <th>
                    Title
                </th>
                <th>
                    Repository
                </th>
                <th>
                    Users
                </th>
                {projects.map((project) => <ProjectItem project={project} />)}
            </table>
    )
}

export default ProjectList