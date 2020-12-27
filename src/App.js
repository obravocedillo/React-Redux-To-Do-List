import React from 'react';
import { Provider } from 'react-redux'
import store from './store/index'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

// Lazy load DoList
const DoList = React.lazy(() => import('./DoList/DoList'));
const Login = React.lazy(() => import('./Login/Login'));
const logged = true;

function App() {
  return (
    <Provider store={store}>
      <React.Suspense fallback={<span>Loading...</span>}>
        <div className="App">
          <Router> 
            <Switch>
            <Route exact path="/" render={() => <Redirect to={{pathname: "/Login"}} />} />
              <Route exact path="/Home">
                <DoList/>
              </Route>
              <Route exact path="/Login">
                <Login/>
              </Route>
              <Route render={() => <Redirect to={{pathname: "/"}} />} />
            </Switch>
          </Router>
        </div>
      </React.Suspense>
    </Provider>
  );
}

export default App;
