import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArtSnippet from './reusables/art-snippet';
import HomeText from './homeText';
class Home extends Component {
    loadMore = async () => {
        try {
            const arts = await axios.get(`/api/art/${this.state.arts.length}/4`)
            console.log(arts)
            this.setState(state => ({ ...state, arts: [...this.state.arts, ...arts.data.artworks], hasMore: arts.data.artworks.length < 10 ? false : true }))
        }
        catch (err) {
            console(err)
        }
    }

    componentDidMount = () => {
        this.loadMore()
    }
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.state = {
            arts: [],
            hasMore: true
        }
    }
    render() {
        return (<div className="home">
            <div className="home-header">
                <HomeText />
                <div className="home-header-content">
                    <h1 className="home-header-content-title">
                        Trending Artwork
                    </h1>
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

export default Home