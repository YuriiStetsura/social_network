import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import './app.css';
import 'antd/dist/antd.css';


// import Header from '../header/header';
import Navigation from '../navigation/navigation';
import News from '../news/news';
import Music from '../music/music';
import Settings from '../settings/settings';
import RightSider from '../right-sider/rightSider';
import ProfileImg from '../profileImg/profileImg';
import DialogsContainer from '../dialogs/dialogsContainer';
import UsersContainer from '../users/usersContainer';
import ProfileContainer from '../profile/ProfileContainer';
import HeaderContainer from '../header/headerContainer';
import MyFriend from '../my-friend/myFriend';
import Login from '../login/login';


const App = () => {
    
    return(
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer />
                <ProfileImg />
                <Navigation />
                <div className="app-wrapper-content">
                    <Route path="/profile/:userId?" 
                           render={() => <ProfileContainer />} />
                    <Route path="/friend"
                           render={() => <MyFriend />} />
                    <Route path="/dialogs" 
                           render={() => <DialogsContainer />} />
                    <Route path="/news" component={News} />
                    <Route path="/music" component={Music} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/users" 
                           render={() => <UsersContainer />} />
                    <Route path="/login" 
                           render={() => <Login />} />
                </div>  
                <RightSider />  
            </div>
        </BrowserRouter>
        )
}

export default App;