import React, { Component } from 'react';
import LandingssideHeader from '../components/LandingssideHeader';
import ikoner from '../img/ikoner';

export class Landingsside extends Component {
    public render() {
        return(<div className="landingsside__header">
            <LandingssideHeader bilde={ikoner.veilederIkon} />
            <p>Her får du en oversikt over syfoting!</p>
        </div>);
    }
}