import React from "react";


class ProjectForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            'users': [],
            'title': '',
            'repository': ''

        }
    };

    handleChange(event) {
        this.setState (
            {
                [event.target.name]: event.target.value
            }
        );
    };

    handleUserSelect(event) {
        if (!event.target.selectedOptions) {
            this.setState (
                {
                    'users': []
                }
            );
            return;
        }
        let users = []
        for (let option of event.target.selectedOptions) {
            users.push(option.value);
        }
        this.setState (
            {
                'users': users
            }
        );
    }

    handelSubmit(event) {
        this.props.createProject(
            this.state.title,
            this.state.repository,
            this.state.users,
            )
        event.preventDefault()
    };

    render() {
        return (
           <form onSubmit={(event) => this.handelSubmit(event)} >
                <input 
                    type="text"
                    name="title"
                    placeholder="title"
                    value={ this.state.title }
                    onChange={(event) => this.handleChange(event)}
                />
                <input 
                    type="text"
                    name="repository"
                    placeholder="repository"
                    value={ this.state.repository }
                    onChange={(event) => this.handleChange(event)}
                />
                
                <select multiple onChange={(event) => this.handleUserSelect(event)}>
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

export default ProjectForm;
