import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'customuser': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const customuser = response.data
                this.setState(
                    {
                        'customuser': customuser
                    }
                )
            })
            .catch(error => console.log(error))
//        const customuser = [
//            {
//                "username": "django",
//                "first_name": "",
//                "last_name": "",
//                "birthday_year": null,
//                "email": "dj@gb.com"
//            },
//            {
//                "username": "User_1",
//                "first_name": "",
//                "last_name": "",
//                "birthday_year": null,
//                "email": "cu1@gb.com"
//            },
//            {
//                "username": "User_2",
//                "first_name": "",
//                "last_name": "",
//                "birthday_year": null,
//                "email": "cu2@gb.com"
//            },
//            {
//                "username": "User_3",
//                "first_name": "",
//                "last_name": "",
//                "birthday_year": null,
//                "email": "cu3@gb.com"
//            }
//        ]
//        this.setState(
//                    {
//                        'customuser':customuser
//                    }
//                )
    }

    render () {
        return (
            <div>
                <UserList customuser={this.state.customuser} />
            </div>
        )
    }
}

export default App;
