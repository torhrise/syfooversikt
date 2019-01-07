import React, { Component } from 'react';
import LandingssideHeader from '../components/LandingssideHeader';

export class Landingsside extends Component {
  public render() {
    return (
      <div className="landingsside__header">
        <LandingssideHeader bilde={'/syfooversikt/src/img/veileder.svg'} />
        <p>Her får du en oversikt over syfoting!</p>
      </div>
    );
  }
}
