import React from 'react';
import Login from './components/auth/login';
import People from './components/people/people';
import Person from './components/people/person';
import Nav from './components/navigation/nav';
import Checkins from './components/checkins/checkins';
import Settings from './components/user/settings';
import MainHeader from './components/navigation/header';
import Dashboard from './components/dash/dashboard';
import CheckinStation from './components/checkins/checkinStation';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

function App() {
  const history = useHistory();
  let isStation = history.location.pathname == '/check-ins/station' ? true : false;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isStation ? null : <Nav />}

      <Layout className="site-layout">
        {isStation ? null : <MainHeader />}
        <Content className={isStation ? 'station' : ''}>
          <div className="site-layout-background" style={{ minHeight: 360 }}>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/people">
                <People />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route exact path="/check-ins">
                <Checkins />
              </Route>
              <Route exact path="/check-ins/station">
                <CheckinStation />
              </Route>
              <Route path="/people/:id" children={<Person />} />

              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Content>
        {isStation ? null : <Footer style={{ textAlign: 'center' }}>Carlos Urena ©2020 Created by Carlos Urena</Footer>}
      </Layout>
    </Layout>
  );
}

export default App;
