import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import ToDoList from './components/ToDo.js'
import ProjectToDoList from './components/ProjectToDo.js'
import LoginForm from './components/Auth.js'

import {BrowserRouter, Link, Route, Routes, Navigate} from 'react-router-dom'


const NotFound404 = ({location}) => {
    return (
        <div>
            <h1> Страница по адресу '{location.pathname}' не найдена </h1>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'customusers': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    getHeaders() {
        let headers = {
            "Content-Type": "application/json"
        }
        if (this.isAuth()) {
            headers['Authorization'] = `Bearer ${this.state.token}`
        }
        return headers
    }
    
    getData() {
        const headers = this.getHeaders()
        axios
            .get('http://127.0.0.1:8000/api/users/', {'headers': headers})
            .then(response => {
                const customusers = response.data.results
                this.setState(
                    {
                        'customusers': customusers
                    }
                )
            })
            .catch(error => console.log(error), this.setState({'customusers': []}))
        axios
            .get('http://127.0.0.1:8000/api/todo/', {'headers': headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            })
            .catch(error => console.log(error), this.setState({'todos': []})
            )
        axios
            .get('http://127.0.0.1:8000/api/project/', {'headers': headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => console.log(error), this.setState({'projects': []}))
    }

    getTokenObtainPair(username, password) {
        
        axios
            .post(
                'http://127.0.0.1:8000/api/token/',
                {
                    username: username,
                    password: password
                })
            .then(response => {
                    this.setState({
                        'token': response.data.access
                    },
                        this.getData
                    )
                    localStorage.setItem('username', username)
                    localStorage.setItem('refresh-token', response.data.refresh)
                })
            .catch(error => alert('Неверный логин или пароль'))
    }

    getTokenFromStorage () {
        axios
            .post (
                'http://127.0.0.1:8000/api/token/refresh', 
                {refresh: localStorage.getItem('refresh-token')}
            )
            .then(response => {
                this.setState({
                    'token': response.data.access
                },
                    this.getData
                )
            })
    }

    logOut() {
        localStorage.clear('username')
        localStorage.clear('refresh-token')
        this.setState({
            'token': ''
        },
            this.getData
        )
    }

    isAuth() {
        return !!this.state.token
    }

    componentDidMount() {
        this.getTokenFromStorage()
    }

    getUsername(){
        if (localStorage.getItem('username')) {
            return localStorage.getItem('username')
        }
        return "Anon"
    }

    render () {
        return (
            <div>
                <p>{this.getUsername()}</p>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/project'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li>
                                <Link to='/todo'>ToDo</Link>
                            </li>
                            <li>
                                {this.isAuth() ? <button onClick={() => this.logOut()}>Logout</button> : <Link to='/login'>Login</Link>} 
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/project'>
                            <Route index element={<ProjectList projects={this.state.projects} />} />
                            <Route exact path=':projectId' element={<ProjectToDoList todo={this.state.todos} />} />
                        </Route>
                        <Route exact path='/users' element={<UserList customuser={this.state.customusers} />} />
                        <Route exact path='/todo' element={<ToDoList todo={this.state.todos} />} />
                        <Route exact path='/login' element={
                            <LoginForm 
                                getTokenObtainPair={(username, password) => this.getTokenObtainPair(username, password)}/>
                        }/>
                        <Route exact path='/' element={<Navigate to='/project' />} />
                        <Route element={NotFound404} />
                    </Routes>

                </BrowserRouter>
            </div>
        )
    }
}

export default App;
