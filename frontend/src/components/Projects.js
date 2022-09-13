import React from 'react'
import {Link} from 'react-router-dom'

// function findProject(event, projects){
//     let substr = event.target.value
//     let filtered_projects = projects.filter(item => item.title.toLowerCase().indexOf(substr.toLowerCase()) !== -1)
//     return filtered_projects
// }

const ProjectItem = ({project, deleteProject}) => {
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
            <td>
                <button type='button' onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject, findProject, reSetData}) => {
    return (
        <div>
            <input type="text" onChange={(event) => findProject(event)}></input>
            <button type='button' onClick={() => reSetData()}>Reset</button>
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
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
        </div>
    )
}

export default ProjectList