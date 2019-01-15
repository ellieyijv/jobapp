import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import  thunk  from 'redux-thunk'

import {Provider} from 'react-redux'
import Login from "./container/login/login";
import Register from "./container/register/Register";
import reducer from "./reducer";
import AuthRoute from "./componnet/authroute/AuthRoute"
import BossInfo from "./container/bossinfo/BossInfo"
import SeekerInfo from "./container/seekerinfo/SeekerInfo"
import DashBoard from "./componnet/dashboard/DashBoard"
import Chat from './componnet/chat/Chat'

//for redux extention
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);

const store= createStore(reducer, enhancer)



ReactDOM.render(
    (<Provider store={store}>
           <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/seekerinfo' component={SeekerInfo}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/chat/:user' component={Chat}></Route>
                        <Route component ={DashBoard}></Route>
                    </Switch>
                </div>
           </BrowserRouter>
        </Provider>),
        document.getElementById('root')
    )
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
