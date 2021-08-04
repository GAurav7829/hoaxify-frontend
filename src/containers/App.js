import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserPage from '../pages/UserPage';
import UserSignupPage from '../pages/UserSignupPage';
import * as apiCalls from '../api/apiCalls';
import TopBar from '../components/TopBar';

const actions = {
  postSignup: apiCalls.signup,
  postLogin: apiCalls.login
}

function App() {
  return (
    <div>
      <TopBar/>
      <div className='container'>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={(props) => <LoginPage {...props} actions={actions} />} />
          <Route exact path='/signup' component={(props) => <UserSignupPage {...props} actions={actions} />} />
          <Route exact path='/:username' component={UserPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
