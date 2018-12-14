import React, { Component } from 'react';
import LandingssideHeader from '../components/LandingssideHeader';

export class Landingsside extends Component {
    render() {
        return(<div className="landingsside__header">
            {<LandingssideHeader bilde={'veileder.svg'} />}
            <p>Her får du en oversikt over syfoting!</p>
        </div>);
    }
}