import React from 'react'

const ToDoItem = ({todoItem, deleteTodo}) => {
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
            <td>
                <button type='button' onClick={() => deleteTodo(todoItem.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todo, deleteTodo}) => {
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
                {todo.map((todoItem) => <ToDoItem todoItem={todoItem} deleteTodo={deleteTodo}/>)}
            </table>
    )
}

export default ToDoList