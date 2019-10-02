import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './containers/layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Layout}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
