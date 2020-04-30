import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import fetchInitialMap from './actions/fetchInitialMap'
import getCurrentUser from './actions/getCurrentUser'
import errorToggle from './actions/errorToggle'

import GoogleMap from './containers/GoogleMap'
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import MarkerCard from './components/MarkerCard'
import PostToMap from './components/PostToMap'
import SymptomChecker from './components/SymptomChecker'

class App extends Component {   
  
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.fetchInitialMap();
  }

  handleErrorClick = () => {
    this.props.errorToggle()
  }
  
  render() {
    return (
      <Fragment>
        {this.props.error.error ? 
        <div className="warning-message">
          <i className="fa fa-times" onClick={this.handleErrorClick} />
          <div className="header">
            Error
          </div>
            <p>{this.props.error.messages}</p>
        </div> 
          : 
          null}

      <Route path="/" component={NavBar} />
      <Route exact path="/" render={(props) => <GoogleMap {...props} initialMapData={this.props.map.initialMap} />} />

        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/checker" component={SymptomChecker} />

          {this.props.user.currentUser !== undefined && this.props.user.currentUser.id ?  (
              <Switch>
                <Route path="/profile" render={(props) => <Profile {...props}/>}/> 
                <Route path="/post" render={(props) => <PostToMap {...props} />} />
                <Route path="/markers/:id" render={(props) => <MarkerCard {...props} />} />
              </Switch>
              )
              : 
              <Route exact path="/" render={(props) => <GoogleMap {...props} initialMapData={this.props.map.initialMap} />} />
            }
        </Switch>
        </Fragment>
    );
  }
  
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => { dispatch(getCurrentUser()) },
    fetchInitialMap: () => { dispatch(fetchInitialMap()) },
    errorToggle: () => { dispatch(errorToggle())}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))