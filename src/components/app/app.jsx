import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import './app.css';
import 'antd/dist/antd.css';


import Header from '../header/header';
import Navigation from '../navigation/navigation';
import Profile from '../profile/profile';
// import Dialogs from '../dialogs/dialogs';
import News from '../news/news';
import Music from '../music/music';
import Settings from '../settings/settings';
import RightSider from '../right-sider/rightSider';
import ProfileImg from '../profileImg/profileImg';
import DialogsContainer from '../dialogs/dialogsContainer';


const App = (props) => {
    
    return(
        <BrowserRouter>
            <div className="app-wrapper">
                <Header />
                <ProfileImg />
                <Navigation />
                <div className="app-wrapper-content">
                    <Route path="/profile" 
                           render={() => <Profile store={props.store}
                                                  profilePage={props.state.profilePage}
                                                  dispatch={props.dispatch} />} />
                    <Route path="/dialogs" 
                           render={() => <DialogsContainer store={props.store}
                                                   />} />
                    <Route path="/news" component={News} />
                    <Route path="/music" component={Music} />
                    <Route path="/settings" component={Settings} />
                </div>  
                <RightSider />  
            </div>
        </BrowserRouter>
        )
}

export default App;