import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Landing from "./components/landing/Landing";
import Footer from "./components/footer/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/*<Navbar />*/}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              {/*<Route exact path="/not-found" component={NotFound} />*/}
              <Route exact path="/profile" component={Profile} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
