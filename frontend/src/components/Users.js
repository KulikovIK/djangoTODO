import React from 'react'

const UserItem = ({customuser}) => {
    return (
        <tr>
            <td>
                {customuser.username}
            </td>
            <td>
                {customuser.first_name}
            </td>
            <td>
                {customuser.last_name}
            </td>
            <td>
                {customuser.birthday_year}
            </td>
            <td>
                {customuser.email}
            </td>
        </tr>
    )
}

const UserList = ({customuser}) => {
    return (
        <div>
            <div>
                <a href="#"> Menu </a>
                <a href="#"> Folder </a>
            </div>
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
                {customuser.map((customuser) => <UserItem customuser={customuser} />)}
            </table>
        </div>

    )
}

export default UserList