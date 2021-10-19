import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class UploadArt extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            title: "",
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
                        UPLOAD ART

                    </h1>
                    <form className="home-header-content-artwork auth" onSubmit={async (e) => {
                        e.preventDefault()
                        if (!this.state.image) {
                            this.props.addAlert('error', "You need to add a picture of your art work")
                            return;
                        }
                        if (!this.state.title) {
                            this.props.addAlert('error', "Please make sure that you have put an appropriate title for your artwork")
                            return;
                        }
                        if (!this.state.description) {
                            this.props.addAlert('error', "Please make sure that you have added an appropriate description for your art")
                            return;
                        }

                        try {
                            const request = await axios.post('/api/art/', this.state);
                            console.log(request.data)
                            this.props.history.push(`/art/${request.data.id}`)


                        }
                        catch (err) {
                            console.log(err.response.data)

                        }
                    }}>
                        <input type="text" onChange={this.onChange} name="title" placeholder="title" className="auth-input" />
                        <input type="text" onChange={this.onChange} name="description" placeholder="Describe your art..." className="auth-input" />

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
                        <button className="auth-button">Upload</button>
                    </form>
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


export default connect(mapStateToProps)(withRouter(UploadArt))