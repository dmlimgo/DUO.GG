import React from 'react';
import { Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';
// import RecruitDetail from './pages/RecruitDetail';
import TopNav from './components/nav/TopNav';
import Footer from './components/Footer';
import './App.scss';

import PropTypes from 'prop-types';

import withRedux from 'next-redux-wrapper'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers';

import { connect } from 'react-redux';
// import { login } from './reducers/user';
import { create } from 'domain';

const App = ({ store }) => {
    console.log('mounted App')
    return (
        <Provider store={store}>
            <div className="app__wrapper">
                <TopNav/>
                <Route path="/" component={Main} exact={true} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Footer/>
            </div>
        </Provider>
    );
}

App.propTypes = {
    store: PropTypes.object,
}

export default withRedux((initialState, options) => {
    const middlewares = []; 
    // const enhancer = compose(
    //     applyMiddleware(...middlewares), 
    //         !options.isServer && window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ != 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    // );
    const enhancer = window.__REDUX_DEVTOOLS_EXTENSTION_COMPOSE__ || compose;
    const store = createStore(reducer, initialState, compose (
        applyMiddleware(...middlewares)
    ));
    return store;
})(App);