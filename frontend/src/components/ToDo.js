import React from 'react'

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

const ToDoList = ({todo}) => {
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
                {todo.map((todoItem) => <ToDoItem todoItem={todoItem} />)}
            </table>
    )
}

export default ToDoList