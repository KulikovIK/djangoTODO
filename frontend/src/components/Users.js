import React from 'react'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.birthday_year}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({customuser}) => {
    return (
            <table>
                <th>
                    User name
                </th>
                <th>
                    First name
                </th>
                <th>
                    Last name
                </th>
                <th>
                    Birthday name
                </th>
                <th>
                    Email
                </th>
                {customuser.map((user) => <UserItem user={user} />)}
            </table>
    )
}

export default UserList