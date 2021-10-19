import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_alert } from '../../redux/actions/alerts'
import { register } from '../../redux/actions/auth';
class Signup extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            userName: null,
            name: null,
            password: null,
            confirmPassword: null,
            ethAddress: null,
            description: ""
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
                        REGISTER

                    </h1>
                    <form className="home-header-content-artwork auth" onSubmit={(e) => {
                        e.preventDefault()
                        if (this.state.password !== this.state.confirmPassword) {
                            this.props.addAlert('error', "Your passwords don't match!")
                            return;
                        }
                        if (this.state.password.length < 8) {
                            this.props.addAlert('error', "Your passwords should be at least 8 characters long!")
                            return;
                        }
                        if (!this.state.image) {
                            this.props.addAlert('error', "You need to add a profile picture")
                            return;
                        }
                        if (!this.state.ethAddress) {
                            this.props.addAlert('error', "Please make sure that you have put a valid ethereum address")
                            return;
                        }
                        if (this.state.ethAddress.length !== 42) {
                            this.props.addAlert('error', "Please make sure that you have put a valid ethereum address")
                            return;
                        }
                        if (!this.state.name) {
                            this.props.addAlert('error', "Please make sure that you have put a valid name")
                            return;
                        }
                        if (!this.state.description) {
                            this.props.addAlert('error', "Please make sure that you have put a valid name")
                            return;
                        }

                        // console.log(this.state);
                        this.props.register(this.state)
                    }}>
                        <input type="text" onChange={this.onChange} name="name" placeholder="name" className="auth-input" />
                        <input type="text" onChange={this.onChange} name="description" placeholder="Describe yourself..." className="auth-input" />
                        <input type="text" onChange={this.onChange} name="userName" placeholder="username" className="auth-input" />
                        <input type="text" onChange={this.onChange} name="ethAddress" placeholder="ethereum" className="auth-input" />

                        <input type='file' placeholder="profile picture" onChange={(e) => {
                            console.log(e.target.value)
                            const fileReader = new FileReader()

                            fileReader.readAsDataURL(e.target.files[0])
                            fileReader.onload = () => {
                                this.setState(state => ({
                                    image: fileReader.result
                                }))
                                // console.log(fileReader.result)
                            }
                        }} className="auth-input-image" accept="image/*" />
                        {this.state.image ? <div className="auth-input-display">
                            <img src={this.state.image} alt="profile" />
                        </div> : null}
                        <input type="password" onChange={this.onChange} name="password" className="auth-input" placeholder="password" />
                        <input type="password" onChange={this.onChange} name="confirmPassword" className="auth-input" placeholder="confirm-password" />
                        <button className="auth-button">REGISTER</button>
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
        register: (state) => register(state, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)