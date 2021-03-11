import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import './app.css';
import 'antd/dist/antd.css';
import News from '../news/news';
import Music from '../music/music';
import Settings from '../settings/settings';
import DialogsContainer from '../dialogs/dialogsContainer';
import ProfileContainer from '../profile/ProfileContainer';
import {HeaderApp} from '../header/header';
import MyFriend from '../my-friend/myFriend';
import Login from '../login/login';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { initialize } from '../../redux/app-reducer';
import { Skeleton } from 'antd';
import { Switch, Link } from 'react-router-dom';
import { appStateType } from '../../redux/redux-store'
import { UsersContainerWithAuthRedirect } from '../users/usersContainer'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { ChatPage } from '../pages/chat/chat-page';
import {LoginAntDesign} from '../login/loginFormByAnt'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class App extends React.Component<PropsType> {

       componentDidMount() {
              this.props.initialize();
       }

       render() {
              return (
                     <Layout>
                            <HeaderApp />
                            <Layout>
                                   <Sider width={200} className="site-layout-background">
                                          <Menu
                                                 mode="inline"
                                                 // defaultSelectedKeys={['1']}
                                                 // defaultOpenKeys={['sub1']}
                                                 style={{ height: '100%', borderRight: 0 }}
                                          >
                                                 <SubMenu key="sub1" icon={<UserOutlined />} title="MyProfile">
                                                        <Menu.Item key="1" >
                                                               <Link to="/profile">
                                                                      Profile
                                                               </Link>
                                                        </Menu.Item>
                                                        <Menu.Item key="2">
                                                               <Link to="/dialogs">
                                                                      Messages
                                                               </Link>
                                                        </Menu.Item>
                                                 </SubMenu>
                                                 <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                                        <Menu.Item key="5">
                                                               <Link to="/users">
                                                                      Developers
                                                               </Link>
                                                        </Menu.Item>
                                                 </SubMenu>
                                                 <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
                                                        <Menu.Item key="9">
                                                               <Link to="/chat">
                                                                      Chat
                                                               </Link>
                                                        </Menu.Item>
                                                 </SubMenu>
                                          </Menu>
                                   </Sider>
                                   <Layout style={{ padding: '0 24px 24px' }}>
                                          <Breadcrumb style={{ margin: '16px 0' }}>
                                                 <Breadcrumb.Item>Home</Breadcrumb.Item>
                                                 <Breadcrumb.Item>List</Breadcrumb.Item>
                                                 <Breadcrumb.Item>App</Breadcrumb.Item>
                                          </Breadcrumb>
                                          <Content
                                                 className="site-layout-background"
                                                 style={{
                                                        padding: 24,
                                                        margin: 0,
                                                        minHeight: 280,
                                                 }}
                                          >
                                                 {this.props.initialized
                                                        ? <Switch>
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
                                                                      render={() => <UsersContainerWithAuthRedirect />} />
                                                               <Route path="/login"
                                                                      render={() => <LoginAntDesign />} />
                                                               <Route path="/chat"
                                                                      render={() => <ChatPage />} />
                                                        </Switch>
                                                        : <Skeleton active />
                                                 }
                                          </Content>
                                   </Layout>
                            </Layout>
                     </Layout>
              )

              // return (
              //        <div className="app-wrapper">
              //               {/* <HeaderApp /> */}
              //               <Navigation />
              //               <div className="app-wrapper-content">
              //                      {this.props.initialized
              //                             ?      <Switch>
              //                                           <Route exact path="/"
              //                                                  render={() => <Redirect to="/profile" />} />
              //                                           <Route path="/profile/:userId?"
              //                                                  render={() => <ProfileContainer />} />
              //                                           <Route path="/friend"
              //                                                  render={() => <MyFriend />} />
              //                                           <Route path="/dialogs"
              //                                                  render={() => <DialogsContainer />} />
              //                                           <Route path="/news" component={News} />
              //                                           <Route path="/music" component={Music} />
              //                                           <Route path="/settings" component={Settings} />
              //                                           <Route path="/users"
              //                                                  render={() => <UsersContainerWithAuthRedirect />} />
              //                                           <Route path="/login"
              //                                                  render={() => <Login />} />
              //                                           <Route path="/chat"
              //                                                  render={() => <ChatPage />} />
              //                                    </Switch>
              //                             :      <Skeleton active /> }
              //               </div>
              //               {/* <RightSider /> */}
              //        </div>

              // )
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
              initialized: state.app.initialized,
              isAuth: state.auth.isAuth,
       }
}

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initialize }))(App);