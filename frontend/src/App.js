import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import ToDoList from './components/ToDo.js'
import ProjectToDoList from './components/ProjectToDo.js'

import {BrowserRouter, Link, Route, Routes, Navigate} from 'react-router-dom'




class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'customusers': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const customusers = response.data.results
                this.setState(
                    {
                        'customusers': customusers
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/project/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => console.log(error))
    }

    render () {
        return (
            <div>
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
                        </ul>
                    </nav>
                    <Routes>
                        <Route path='/project'>
                            <Route index element={<ProjectList projects={this.state.projects} />} />
                            <Route exact path=':projectId' element={<ProjectToDoList todo={this.state.todos} />} />
                        </Route>
                        <Route exact path='/users' element={<UserList customuser={this.state.customusers} />} />
                        <Route exact path='/todo' element={<ToDoList todo={this.state.todos} />} />
                        <Route exact path='/' element={<Navigate to='/project' />} />
                    </Routes>

                </BrowserRouter>
            </div>
        )
    }
}

export default App;
