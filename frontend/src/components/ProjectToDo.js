import React from 'react'
import {useParams} from 'react-router-dom'


const ToDoItem = ({todoItem}) => {
    return (
        <tr>
            <td>
                {todoItem.project}
            </td>
            <td>
                {todoItem.user}
            </td>
            <td>
                {todoItem.body}
            </td>
            <td>
                {todoItem.is_active}
            </td>
        </tr>
    )
}

const ProjectToDoList = ({todo}) => {
    var params = useParams()

    var filteredToDo = todo.filter((todoItem) => todoItem.project === parseInt(params.projectId))

    return (
            <table>
                <th>
                    Project
                </th>
                <th>
                    User
                </th>
                <th>
                    ToDo
                </th>
                <th>
                    Active?
                </th>
                {filteredToDo.map((todoItem) => <ToDoItem todoItem={todoItem} />)}
            </table>
    )
}

export default ProjectToDoList