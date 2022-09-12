import React from "react";


class LoginForm extends React.Component {
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
        if (!vent.target.selectedOptions) {
            this.setState (
                {
                    'users': []
                }
            );
            return;
        }
        let users = []
        for (let option of vent.target.selectedOptions) {
            users.push(option.value);
        }
        this.setState (
            {
                'users': users
            }
        );

    }

    handelSubmit(event) {
        console.log(this.state.title)
        console.log(this.state.repository)
        console.log(this.state.users)
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
                    {this.props.users.map((customusers) => 
                        <option value={customusers.id}>
                            {customusers.username}
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
