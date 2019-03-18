import React, { Component } from 'react';
import {OVERSIKT_VISNING_TYPE} from '../konstanter';
import OversiktContainer from '../containers/OversiktContainer';

const tekster = {
    enhetensOversikt: 'Enhetens oversikt',
    minOversikt: 'Min oversikt',
    veilederoversikt: 'Veilederoversikt'
};

interface StateProps {
  visning: string;
}

class OversiktVelger extends Component<{}, StateProps> {
  constructor(props: any) {
      super(props);
      this.state = {
        visning: OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT,
      };
      this.byttVisning = this.byttVisning.bind(this);
  }

  render() {
    const visning  = this.state.visning;
    return (<div>
      <div className="oversiktVelger">
        <ul>
          <li>
            <button className={visning === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT ? 'oversiktVelger__knapp--aktiv' : ''}
                    aria-pressed={visning === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT}
                    onClick={() => { this.byttVisning(OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT); }}>
              {tekster.enhetensOversikt}
            </button>
          </li>
        </ul>
      </div>
      <OversiktContainer type={visning}/>
    </div>);
  }

  byttVisning(visning: string) {
    this.setState({
      visning,
    });
  }
}

export default OversiktVelger;
