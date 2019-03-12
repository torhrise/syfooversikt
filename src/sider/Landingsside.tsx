import React, { Component } from 'react';
import LandingssideHeader from '../components/LandingssideHeader';
import OversiktVelger from '../components/OversiktVelger';
import Side from './Side';
import {HL_VISNING_TYPE} from '../konstanter';

export class Landingsside extends Component {
  public render() {
    return (
      <Side tittel="">
        <div>
          <OversiktVelger/>
        </div>
      </Side>
    );
  }
}
