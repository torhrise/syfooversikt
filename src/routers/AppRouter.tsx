import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { Landingsside } from '../sider/Landingsside';
import ManglerTilgangside from '../sider/ManglerTilgangside';

interface AppRouterProps {
  history: any;
}

const AppRouter = ({ history }: AppRouterProps) => {
  return (<Router history={history}>
      <Switch>
        <Route path="/na" component={ManglerTilgangside} />
        <Route path="*" component={Landingsside} />
      </Switch>
  </Router>);
};

export default AppRouter;
