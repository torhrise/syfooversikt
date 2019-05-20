import React, { Component } from 'react';
import OversiktVelger from '../components/OversiktVelger';
import Side from './Side';
import LandingssideHeader from '../components/LandingssideHeader';

export class Landingsside extends Component {
  public render() {
    return (<Side tittel="">
        <div>
          <LandingssideHeader />
          <OversiktVelger/>
        </div>
    </Side>);
  }
}
