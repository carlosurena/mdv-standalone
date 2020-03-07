import React from "react";
import Login from "./components/auth/login";
import People from "./components/people/people";
import Person from "./components/people/person";
import Nav from "./components/navigation/nav";
import MainHeader from "./components/navigation/header";
import Dashboard from "./components/dash/dashboard";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MainHeader />

      <Layout className="site-layout">
        <Nav />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/people">
                <People />
              </Route>
              <Route path="/people/:id" children={<Person />} />

              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>

      <Footer style={{ textAlign: "center" }}>
        Carlos Urena ©2020 Created by Carlos Urena
      </Footer>
    </Layout>
  );
}

export default App;
