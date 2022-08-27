import React from "react";


class LoginForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: '',
            password: ''
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
        this.props.getTokenObtainPair(this.state.username, this.state.password)
        event.preventDefault()
    };

    render() {
        return (
           <form onSubmit={(event) => this.handelSubmit(event)} >
                <input 
                    type="text"
                    name="username"
                    placeholder="login"
                    value={ this.state.username }
                    onChange={(event) => this.handleChange(event)}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="password"
                    value={ this.state.password }
                    onChange={(event) => this.handleChange(event)}
                />
                <input
                    type="submit"
                    value="Войти"
                />
           </form> 
        );
    };
}

export default LoginForm;
