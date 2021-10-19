import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
class Art extends Component {
    async componentWillMount() {
        try {
            const request = await axios.get(`/api/art/${this.props.id}`)
            console.log(request.data.art.user)
            const request2 = await axios.get(`/api/user/${request.data.art.user}`)
            // console.log(request2.data.user)
            // let request3;
            let ratings;
            if (this.props.loggedIn) {
                const request3 = await axios.get(`/api/ratings/auth/${this.props.id}`);
                if (request3.data.rated) {
                    ratings = {
                        rated: request3.data.rated
                    }
                }
                else {
                    ratings = {
                        rated: {
                            ratings: 0
                        }
                    }
                }

            }

            console.log(request2.data)
            this.setState(state => ({
                ...state, ...request.data.art, author: request2.data.user, ...ratings, notFound: false
            }))

        }
        catch (err) {
            console.log(err)
            this.setState({
                notFound: true
            })
        }
    }
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            title: "",
            notFound: true,
            author: {},
            description: "",
            rating: 0,
            rated: {
                rating: 0
            }
        }
    }
    onChange = (e) => {
        this.setState(state => ({ ...state, [e.target.name]: e.target.value }))
    }
    render() {
        if (this.state.notFound) {
            return null
        }
        console.log(this.state.author._id, this.props.user._id)

        return (
            <div className="snippet-art">

                <img onClick={() => {
                    this.props.history.push(`/art/${this.props.id}`)
                }} src={this.state.image} className=" snippet-art-image" alt={this.state.title} />
                <h1 onClick={() => {
                    this.props.history.push(`/art/${this.props.id}`)
                }} className="snippet-art-title">
                    {this.state.title}
                </h1>
                <h3 onClick={() => {
                    this.props.history.push(`/art/${this.props.id}`)
                }} className=" snippet-art-description">{this.state.description}</h3>
                <div className="home-header-content-artwork art-artist" onClick={() => {
                    this.props.history.push(`/author/${this.state.author._id}`)
                }}>
                    <h2 className="art-artist-name">{this.state.author.name}</h2>

                    <img className="art-artist-image" src={this.state.author.image} alt={this.state.author.name} />
                    {/* <button className="auth-button">Upload</button> */}
                </div>
                <div className=" art-rating" >
                    <ArrowUpwardIcon
                        onClick={async () => {
                            // this.props.history.push(`/author/${this.state.author._id}`)
                            try {
                                if (this.props.loggedIn) {
                                    console.log(this.state.rated.rating)
                                    if (!this.state.rated) {
                                        const request = await axios.put(`/api/ratings/${this.props.id}/1`)
                                        this.setState(state => ({
                                            ...state, rating: this.state.rating - this.state.rated.rating + 1, rated: {
                                                ...state.rated, rating: 1
                                            }
                                        }))
                                    }
                                    else {
                                        if (this.state.rated.rating === 1) {
                                            const request = await axios.put(`/api/ratings/${this.props.id}/0`)
                                            this.setState(state => ({
                                                ...state, rating: this.state.rating - this.state.rated.rating, rated: {
                                                    ...state.rated, rating: 0
                                                }
                                            }))
                                        }
                                        else {
                                            const request = await axios.put(`/api/ratings/${this.props.id}/1`)
                                            this.setState(state => ({
                                                ...state, rating: this.state.rating - this.state.rated.rating + 1, rated: {
                                                    ...state.rated, rating: 1
                                                }
                                            }))
                                        }
                                    }
                                }
                            }
                            catch (err) {
                                console.log(err.message)

                            }
                        }} className={this.state.rated.rating === 1 ? "art-rating-up-active" : "art-rating-up"} />
                    <span className="art-rating-number">{this.state.rating}</span>

                    <ArrowDownwardIcon onClick={async () => {
                        // this.props.history.push(`/author/${this.state.author._id}`)
                        try {
                            if (this.props.loggedIn) {
                                console.log(this.state.rated.rating)
                                if (!this.state.rated) {
                                    const request = await axios.put(`/api/ratings/${this.props.id}/-1`)
                                    this.setState(state => ({
                                        ...state, rating: this.state.rating - this.state.rated.rating - 1, rated: {
                                            ...state.rated, rating: - 1
                                        }
                                    }))
                                }
                                else {
                                    if (this.state.rated.rating === -1) {
                                        const request = await axios.put(`/api/ratings/${this.props.id}/0`)
                                        this.setState(state => ({
                                            ...state, rating: this.state.rating - this.state.rated.rating, rated: {
                                                ...state.rated, rating: 0
                                            }
                                        }))
                                    }
                                    else {
                                        const request = await axios.put(`/api/ratings/${this.props.id}/-1`)
                                        this.setState(state => ({
                                            ...state, rating: this.state.rating - this.state.rated.rating - 1, rated: {
                                                ...state.rated, rating: -1
                                            }
                                        }))
                                    }
                                }
                            }
                        }
                        catch (err) {
                            console.log(err.message)

                        }
                    }} className={this.state.rated.rating === -1 ? "art-rating-down-active" : "art-rating-down"} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loaded
    }
}


export default connect(mapStateToProps)(withRouter(Art))