import React from 'react';
import { Route, Router } from 'react-router';
import { Landingsside } from '../sider/Landingsside';

interface AppRouterProps {
  history: any;
}

const AppRouter = ({ history }: AppRouterProps) => {
  return (<Router history={history}>
      <Route path="*" component={Landingsside} />
  </Router>);
};

export default AppRouter;
