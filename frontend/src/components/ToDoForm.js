import React from "react";


class ToDoForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            'user': props.customuser[0].id,
            'body': '',
            'project': props.project[0].id
        }
    };

    handleChange(event) {
        this.setState (
            {
                [event.target.name]: event.target.value
            }
        );
    };

    handelSubmit(event) {
        this.props.createToDo(
            this.state.project,
            this.state.body,
            this.state.user,
            )
        event.preventDefault()
    };

    render() {
        return (
           <form onSubmit={(event) => this.handelSubmit(event)} >
                <input 
                    type="text"
                    name="body"
                    placeholder="ToDo"
                    value={ this.state.title }
                    onChange={(event) => this.handleChange(event)}
                />
                
                <select name="project" onChange={(event) => this.handleChange(event)}>
                    {this.props.project.map((project) => 
                        <option value={project.id}>
                            {project.title}
                        </option>)}
                </select>
                
                <select name="user" onChange={(event) => this.handleChange(event)}>
                    {this.props.customuser.map((customuser) => 
                        <option value={customuser.id}>
                            {customuser.username}
                        </option>)}
                </select>
                <input
                    type="submit"
                    value="Create"
                    className="btn btn-primary"
                />
           </form> 
        );
    };
}

export default ToDoForm;
