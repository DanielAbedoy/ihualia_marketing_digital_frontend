import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import { valueContext, SessionContext } from '../../sessionContext';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';

//load
import Load from '../../components/Load.js';

// routes config
import routes from '../../routes';
import Auth from '../../auth';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  state = { valConxt: valueContext(), user:'' }

  loading = () => <Load />

  componentDidMount = () => this.setValueContext();

  signOut(e) {
    e.preventDefault()
    var store = require('store');
    store.clearAll();
    this.props.history.push('/login')
  }

  authCountFunction = (component, props) => {
    if (!new Auth().isAuthUseCuenta()) {
      alert("Debes tener una cuenta en uso")
      const location = props.location.pathname.split("/");
      return (<Redirect to={`/${location[1]}`} />);
    }
    return (component);
  }

  setValueContext = async() => {
    let info = await valueContext().user();
    this.setState({ valConxt: valueContext(), user: info });
  }
  
  render() {
    return (
      <div className="app">

        <SessionContext.Provider value={this.state.valConxt} >

          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader history={this.props.history} cuenta={this.state.valConxt.cuenta} user={this.state.user} onLogout={e => this.signOut(e)} />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes} router={router} />
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => {
                            if (route.authCount) return this.authCountFunction(<route.component {...props} setContext={this.setValueContext} />, props);
                            else return (<route.component {...props} setContext={this.setValueContext} />);
                          }} />
                      ) : (null);
                    })}
                    <Redirect from="/" to="/login" />
                  </Switch>
                </Suspense>
              </Container>
            </main>
            <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <DefaultAside />
              </Suspense>
            </AppAside>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </SessionContext.Provider  >
      </div>
    );
  }
}

export default DefaultLayout;
