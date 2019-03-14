import React, { Component } from 'react';
import OversiktVelger from '../components/OversiktVelger';
import Side from './Side';

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
