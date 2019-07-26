import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login'
import SignUpForm from './components/SignUpForm'


class App extends React.Component {
  state = {
    userId: undefined
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={() => <Login />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/signup" component={() => <SignUpForm />} />
          {/* <SignIn />
          <SignUp /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
