import React, { Component } from 'react';
import {HL_VISNING_TYPE} from '../konstanter';
import Oversikt from './Oversikt';
import OversiktContainer from '../containers/OversiktContainer';

const enhetensOversiktTekst = 'Enhetens oversikt';
const minOversiktTekst = 'Min oversikt';
const veilederoversiktTekst = 'Veilederoversikt';

interface StateProps {
  visning: string;
}

class OversiktVelger extends Component<{}, StateProps> {
  constructor(props: any) {
      super(props);
      this.state = {
        visning: HL_VISNING_TYPE.ENHETENS_OVERSIKT,
      };
      this.byttVisning = this.byttVisning.bind(this);
  }

  render() {
    const visning  = this.state.visning;
    return (
      <div>
        <div className="oversiktVelger">
          <ul>
            <li>
              <button className={`${visning === HL_VISNING_TYPE.ENHETENS_OVERSIKT && 'oversiktVelger__knapp--aktiv'}`}
                      aria-pressed={visning === HL_VISNING_TYPE.ENHETENS_OVERSIKT}
                      onClick={() => { this.byttVisning(HL_VISNING_TYPE.ENHETENS_OVERSIKT); }}>
                {enhetensOversiktTekst}
              </button>
            </li>
            <li>
              <button className={`${visning === HL_VISNING_TYPE.MIN_OVERSIKT && 'oversiktVelger__knapp--aktiv'}`}
                      aria-pressed={visning === HL_VISNING_TYPE.MIN_OVERSIKT}
                      onClick={() => { this.byttVisning(HL_VISNING_TYPE.MIN_OVERSIKT); }}>
                {minOversiktTekst}
              </button>
            </li>
            <li>
              <button className={`${visning === HL_VISNING_TYPE.VEILEDEROVERSIKT && 'oversiktVelger__knapp--aktiv'}`}
                      aria-pressed={visning === HL_VISNING_TYPE.VEILEDEROVERSIKT}
                      onClick={() => { this.byttVisning(HL_VISNING_TYPE.VEILEDEROVERSIKT); }}>
                {veilederoversiktTekst}
              </button>
            </li>
          </ul>
        </div>
        <div>
          <OversiktContainer type={visning}/>
        </div>
      </div>
    );
  }

  byttVisning(visning: string) {
    this.setState({
      visning,
    });
  }
}

export default OversiktVelger;
