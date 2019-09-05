import React from 'react';
import { RouteComponentProps, Router, Route, Switch } from 'react-router';
import OversiktContainer from '../containers/OversiktContainer';
import { OverviewTabType } from '../konstanter';
import HeaderWrapper from '../components/HeaderWrapper';
import LandingssideHeader from '../components/LandingssideHeader';
import NavigationBar from '../components/NavigationBar';

export const Landingsside = (props: RouteComponentProps) => (
    <Router {...props}>
      <div>
        <HeaderWrapper>
          <LandingssideHeader />
          <NavigationBar />
        </HeaderWrapper>
        <Switch>
          <Route path={'/enhet'} render={() => <OversiktContainer type={OverviewTabType.ENHET_OVERVIEW} />} />
          <Route path={'/bruker'} render={() => <OversiktContainer type={OverviewTabType.MY_OVERVIEW} />} />
        </Switch>
      </div>
    </Router>
);
