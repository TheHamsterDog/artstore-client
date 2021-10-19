import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArtSnippet from './reusables/art-snippet';

class Profile extends Component {
    loadMore = async () => {
        try {
            const arts = await axios.get(`/api/art/author/${this.state.arts.length}/${this.props.match.params.id}`)
            console.log(arts)
            this.setState(state => ({ ...state, arts: [...this.state.arts, ...arts.data.artworks], hasMore: arts.data.artworks.length < 10 ? false : true }))
        }
        catch (err) {
            console(err)
        }
    }

    componentWillMount = async () => {
        const user = await axios.get(`/api/user/${this.props.match.params.id}`)
        if (this.props.loggedIn) {
            const followers = await axios.get(`/api/follower/${this.props.match.params.id}`)
            this.setState(state => ({ ...state, author: user.data.user, followers: followers.data.count, followed: followers.data.followed }));

        }
        else {
            const followers = await axios.get(`/api/follower/unauth/${this.props.match.params.id}`)
            this.setState(state => ({ ...state, author: user.data.user, followers: followers.data.count, followed: false }));
           
        }
        this.loadMore()
    }
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            arts: [],
            author: {},
            followers: 0,
            followed: false,
            hasMore: true
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
                    <input className="navbar-right-search" type="text" placeholder="search" />

                </div>
                <div className="home-header-content">
                    <h1 className="home-header-content-title">
                        {this.state.author.userName}
                    </h1>
                    <div style={{ display: 'flex' }}>{this.state.author._id === this.props.user._id ? null : <button onClick={async () => {
                        try {
                            await axios.post(`/api/follower/follow/${this.props.match.params.id}`)
                            this.setState(state => ({ ...state, followed: !state.followed, followers: state.followed ? state.followed - 1 : state.followers + 1 }))
                        }
                        catch (err) {

                        }

                    }} className="profile-follow">{this.state.followed ? "unfollow" : "follow"}</button>}
                        <h2 className="art-artist-name">{this.state.followers} Followers</h2>
                    </div>
                    <div className=" art-artist" style={{

                        padding: 0,
                        margin: '4rem 0',
                        height: '3rem',
                        justifyContent: 'flex-start'
                    }} onClick={() => {
                        this.props.history.push(`/author/${this.state.author._id}`)
                    }}>
                        <img style={{
                            marginRight: '3rem'
                        }} className="art-artist-image" src={this.state.author.image} alt={this.state.author.name} />

                        <h2 className="art-artist-name">{this.state.author.name}</h2>

                        {/* <button className="auth-button">Upload</button> */}
                    </div>
                    <div className="home-header-content-artwork home-header-content-artwork-infinite">
                        <InfiniteScroll
                            dataLength={this.state.arts.length} //This is important field to render the next data
                            next={this.loadMore}
                            hasMore={this.state.hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <strong>(╯°□°）╯︵ ┻━┻</strong>
                                </p>
                            }

                        >
                            {this.state.arts.map(art => {
                                return <ArtSnippet id={art._id} />
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>

        </div>)
    }
}
const mapStateToProps = (state) => {
    return ({
        loggedIn: state.auth.loaded,
        user: state.auth.user
    })
}
export default connect(mapStateToProps)(Profile)