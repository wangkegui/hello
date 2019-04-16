import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import App from '../activitylist/index';
console.log(Route)

const route = () => (
    <Router>
        <Route path='/' exact render={() => <Redirect to='/home' />}/>
        <Route path='/home' render={() => (
            <div>
                <Route path='/home' exact render={() => <Redirect to='/home/app' />}/>
                <Route path='/home/app' component={App}/>
            </div>
        )} />
    </Router>
)

export default route