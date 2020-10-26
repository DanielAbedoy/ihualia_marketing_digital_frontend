import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import "bootswatch/dist/flatly/bootstrap.min.css";
import './App.scss';
import './index.css';


import Load from './components/Load.js';
import Auth from './auth';

const loading = () => <Load />

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const EventoPublic = React.lazy(() => import('./views/Pages/Evento/Evento'))

class App extends Component {


  authFunction = (component, option, location) => {
    if (new Auth().isAuthLogin() === option) {
      return (<Redirect to={`/${location}`}/>)
    }
    return (component);
  }

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/login" name="Login Page" render={props => this.authFunction(<Login {...props} />, true, "inicio") } />
            <Route path="/register" name="Register Page" render={props => this.authFunction(<Register {...props} />, true, "inicio")} />
            <Route path="/evento" exact={true} name="Evento" render={props => <EventoPublic {...props} />} />
            <Route path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Home" render={props => this.authFunction(<DefaultLayout {...props} />, false, "login")} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
