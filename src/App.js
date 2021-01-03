import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import './App.css';

// Lazy load DoList
const DoList = React.lazy(() => import('./DoList/DoList'));
const Login = React.lazy(() => import('./Login/Login'));
const GuardedRoute = React.lazy(() => import('./Guard/GuardedRoute')); 

function App() {
  const { user } = useSelector((state) => state)
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <div className="App">
        <Router> 
          <Switch>
            <Route exact path="/" render={() => <Redirect to={{pathname: "/Login"}} />}/>
            <GuardedRoute path='/Home' component={DoList} auth={user.alreadyLoggedIn}/>
            <Route exact path="/Login">
              <Login/>
            </Route>
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
          </Switch>
        </Router>
      </div>
    </React.Suspense>
   
  );
}

export default App;
