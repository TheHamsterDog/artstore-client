import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { add_alert } from '../redux/actions/alerts'

class Wallet extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            accountBalance: 0,
            etherBalance: 0
        }
    }
    async componentDidMount() {
        try {
            const request = await axios.get('/api/ether')
            console.log(request.data);
            this.setState(state => ({
                accountBalance: request.data.accountBalance,
                etherBalance: request.data.etherBalance
            }))
        }
        catch (err) {
            console.log(err)
        }
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
                        Your Wallet
                    </h1>
                    <div className="home-header-content-artwork auth">
                        <div className="wallet-container">
                            <h3 className="wallet-container-title">Ether Balance: {this.state.etherBalance}</h3>
                        </div>
                        <div className="wallet-container">
                            <h3 className="wallet-container-title">Account Balance: {this.state.accountBalance}</h3>
                        </div>
                        <button onClick={async () => {
                            try {
                                const request = await axios.post('/api/ether/withdraw');
                                console.log(request.data)
                                document.location.reload()
                            }
                            catch (err) {
                                console.log(err);
                            }

                        }} className="auth-button">Withdraw</button>
                    </div>
                </div>
            </div>
        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps)(Wallet)