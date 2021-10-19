import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './components/home'
import Profile from './components/profile';
import Login from './components/auth/login'
import Register from './components/auth/signup'
import { remove_alert } from './redux/actions/alerts'
import { loadUser } from './redux/actions/auth';
import Wallet from './components/wallet';
import Art from './components/art';
import UploadArt from './components/uploadArt';
import Navbar from './components/reusables/navbar';
import AlertComponent from './components/reusables/alert';
import './App.css';
import Search from './components/search';

class App extends Component {
  componentDidMount() {
    if (localStorage.token) {
      this.props.loadUser()
    }
  }
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    console.log(props)
  }
  render() {
    return (
      <Router>
        <div className="alerts">
          {
            this.props.alerts.map(alert => {
              return <AlertComponent message={alert.message} type={alert.type} key={alert.id} onClose={this.props.removeAlert.bind(this, alert.id)}></AlertComponent>
            })
          }
        </div>

        <Navbar />
        <Switch>
          <Route exact path="/"> <Home /></Route>
          <Route exact path="/search/:text" component={Search}>

          </Route>
          <Route exact path="/art/:id" component={Art}>

          </Route>

          <Route exact path="/author/:id" component={Profile}>
            
          </Route>


          {!this.props.loggedIn ? <Switch>
            <Route exact path="/sign-up">
              <Register>
              </Register>
            </Route>
            <Route exact path="/sign-in"> <Login /></Route>
            <Route>
              Not found
            </Route>
          </Switch>
            :
            <Switch>
              <Route exact path="/profile">
                My Profile
              </Route>
              <Route exact path="/favorites">
                Favorite
              </Route>
              <Route exact path="/wallet">
                <Wallet />
              </Route>
              <Route exact path="/upload-art">
                <UploadArt />
              </Route>
              <Route>
                Not found
              </Route>
            </Switch>
          }

        </Switch>

      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return ({
    loggedIn: state.auth.loaded,
    user: state.auth.user,
    alerts: state.alert
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    removeAlert: (id) => remove_alert(id, dispatch),
    loadUser: () => loadUser(dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
