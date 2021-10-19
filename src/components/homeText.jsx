import React from 'react'
import { withRouter } from 'react-router-dom'
class HomeText extends React.Component {
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
        }} className="home-header-text">
            <h1 className="home-header-text-heading">
                Welcome to art store
            </h1>
            <p className="home-header-text-paragraph">
                The best place for up and coming artists to show off their work, and even get paid for it.
            </p>
            <input value={this.state.text} onChange={(e) => {
                this.setState(state => ({ ...state, text: e.target.value }))
            }} className="navbar-right-search" type="text" placeholder="search" />

        </form>)
    }
}
export default withRouter(HomeText)