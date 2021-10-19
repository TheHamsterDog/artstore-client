import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import { withRouter } from 'react-router-dom'

import AddIcon from '@mui/icons-material/Add';
class Navbar extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            text: this.props.match.params.text || ""
        }
    }
    render() {
        return (<form onSubmit={(e) => {
            e.preventDefault();
            this.props.history.push(`/search/${this.state.text}`)
        }} className="navbar">
            <Link to="/" className="navbar-left">
                ART
            </Link>
            <input value={this.state.text} onChange={(e) => {
                this.setState(state => ({ ...state, text: e.target.value }))
            }} className="navbar-right-search" type="text" placeholder="search" />
            <div className="navbar-right">


                <div className="navbar-right-avatar">
                    <Avatar className="navbar-right-avatar-icon" src={this.props.user.image}>
                    </Avatar>
                    {
                        this.props.loggedIn ?
                            <div className="navbar-right-avatar-list">
                                <Link to="/profile" className="navbar-right-avatar-list-button">
                                    <AccountBoxIcon className="navbar-right-avatar-list-button-icon" /> <span className="navbar-right-avatar-list-button-text">My Profile</span>
                                </Link>
                         
                                <Link to="/wallet" className="navbar-right-avatar-list-button">
                                    <AccountBalanceWalletIcon className="navbar-right-avatar-list-button-icon" /> <span className="navbar-right-avatar-list-button-text">My Wallet</span>
                                </Link>
                                <Link className="navbar-right-avatar-list-button" to="/upload-art">
                                    <AddIcon className="navbar-right-avatar-list-button-icon" /> <span className="navbar-right-avatar-list-button-text">Upload Art</span>

                                </Link>
                                <Link className="navbar-right-avatar-list-button" to="/" onClick={() => {
                                    localStorage.removeItem('token');
                                    document.location.reload()
                                }}>
                                    <LogoutIcon className="navbar-right-avatar-list-button-icon" /> <span className="navbar-right-avatar-list-button-text">Log Out</span>
                                </Link>

                            </div> : <div className="navbar-right-avatar-list">

                                <Link to="/sign-in" className="navbar-right-avatar-list-button">
                                    <span className="navbar-right-avatar-list-button-text" >Login</span>
                                </Link>
                                <Link to="/sign-up" className="navbar-right-avatar-list-button">
                                    <span className="navbar-right-avatar-list-button-text">Sign Up</span>
                                </Link>
                            </div>
                    }

                </div>
            </div>

        </form >)
    }
}
const mapStateToProps = (state) => {
    return ({
        loggedIn: state.auth.loaded,
        user: state.auth.user
    })
}
export default connect(mapStateToProps)(withRouter(Navbar))