import React from 'react';
import { Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';
// import RecruitDetail from './pages/RecruitDetail';
import TopNav from './components/nav/TopNav';
import Footer from './components/Footer';
import './App.scss';


const App = () => {
    return (
        <div className="app__wrapper">
            <TopNav/>
            <Route path="/" component={Main} exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            {/* <Route path="/detail/:id" component={RecruitDetail} /> */}
            <Footer/>
        </div>
    );
}

export default App;
