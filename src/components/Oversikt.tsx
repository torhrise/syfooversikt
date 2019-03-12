import React, { Component } from 'react';
import {OVERSIKT_VISNING_TYPE} from '../konstanter';

const tekster = {
  overskrifter: {
    enhetensOversikt: 'Ubehandlede møtebehov',
    minOversikt: 'Denne fanen er under utvikling',
    veilederoversikt: 'Denne fanen er under utvikling'
  }
};

const enhetensOversiktOverskrift = 'Ubehandlede møtebehov';
const minOversiktOverskrift = 'Denne fanen er under utvikling';
const veilederoversiktOverskrift = 'Denne fanen er under utvikling';

interface OversiktProps {
  type: string;
}

class Oversikt extends Component<OversiktProps, {}> {
  constructor(props: OversiktProps) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT && <h1>{tekster.overskrifter.enhetensOversikt}</h1>}
        {this.props.type === OVERSIKT_VISNING_TYPE.MIN_OVERSIKT && <h1>{tekster.overskrifter.minOversikt}</h1>}
        {this.props.type === OVERSIKT_VISNING_TYPE.VEILEDEROVERSIKT && <h1>{tekster.overskrifter.veilederoversikt}</h1>}
      </div>
    );
  }
}

export default Oversikt;
