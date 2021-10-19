import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_alert } from '../../redux/actions/alerts'
import { login } from '../../redux/actions/auth';
class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: ""
        }
    }
    onChange = (e) => {
        this.setState(state => ({ ...state, [e.target.name]: e.target.value }))
    }
    render() {
        return (<div className="home">
            <div className="home-header">
                <div className="home-header-text">
                    <h1 className="home-header-text-heading">
                        Welcome to art store
                    </h1>
                    <p className="home-header-text-paragraph">
                        The best place for up and coming artists to show off their work, and even get paid for it.
                    </p>

                </div>
                <div className="home-header-content">
                    <h1 className="home-header-content-title">
                        LOG IN
                    </h1>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        this.props.login(this.state)
                    }} className="home-header-content-artwork auth">
                        <input type="text" placeholder="user name" name="userName" onChange={this.onChange} className="auth-input" />
                        <input type="password" name="password" onChange={this.onChange} className="auth-input" placeholder="password" />
                        <button className="auth-button">LOG IN</button>
                    </form>
                </div>
            </div>

        </div>)
    }
}
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (type, message) => add_alert(type, message, dispatch),
        login: (state) => login(state, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)