import React, { Component } from 'react';
import LandingssideHeader from '../components/LandingssideHeader';
import Side from './Side';

export class Landingsside extends Component {
  public render() {
    return (
      <Side tittel="">
        <div className="landingsside__header">
          <LandingssideHeader bilde={'/syfooversikt/src/img/veileder.svg'} />
          <p>Her får du en oversikt over syfo-oppgaver!</p>
        </div>
      </Side>
    );
  }
}
