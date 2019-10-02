import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container, Row } from 'reactstrap';

import Header from '../components/header';

import routes from '../routes';

function Layout() {
  return (
    <>
      <Header />

      <Container>
        <Row>
          <Switch>
            {routes.map((r, i) => {
              return r.Component ? (
                <Route key={i} path={r.path} exact={r.exact} render={p => <r.Component {...p} />} />
              ) : null;
            })}
          </Switch>
        </Row>
      </Container>
    </>
  );
}

export default Layout;
