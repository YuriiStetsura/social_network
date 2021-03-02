import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import './app.css';
import 'antd/dist/antd.css';
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
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { initialize } from '../../redux/app-reducer';
import { Skeleton } from 'antd';
import { Switch } from 'react-router-dom'; 
import { appStateType } from '../../redux/redux-store'

class App extends React.Component<PropsType> {

       componentDidMount() {
              this.props.initialize();
       }

       render() {
              return (
                     <div className="app-wrapper">
                            <HeaderContainer />
                            <ProfileImg />
                            <Navigation />
                            <div className="app-wrapper-content">
                                   {this.props.initialized
                                          ?      <Switch>
                                                        <Route exact path="/"
                                                               render={() => <Redirect to="/profile" />} />
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
                                                 </Switch>
                                          :      <Skeleton active /> }
                            </div>
                            <RightSider />
                     </div>

              )
       }

}

type MapStateToProps = {
       initialized: boolean
       isAuth: boolean
}
type MapDispatchPropsType = {
       initialize: () => void
}
type PropsType = MapDispatchPropsType & MapStateToProps

const mapStateToProps = (state: appStateType): MapStateToProps => {
       return {
              initialized : state.app.initialized,
              isAuth : state.auth.isAuth,
       }
}

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initialize }))(App);