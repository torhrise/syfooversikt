import React, { Component } from 'react';
import {HL_VISNING_TYPE} from '../konstanter';

const enhetensOversiktOverskrift = 'Ubehandlede møtebehov';
const minOversiktOverskrift = 'Denne fanen er under utvikling';
const veilederoversiktOverskrift = 'Denne fanen er under utvikling';

interface EnhetensOversiktProps {
  type: string;
}

class EnhetensOversikt extends Component<EnhetensOversiktProps, {}> {
  constructor(props: EnhetensOversiktProps) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.type === HL_VISNING_TYPE.ENHETENS_OVERSIKT && <h1>{enhetensOversiktOverskrift}</h1>}
        {this.props.type === HL_VISNING_TYPE.MIN_OVERSIKT && <h1>{minOversiktOverskrift}</h1>}
        {this.props.type === HL_VISNING_TYPE.VEILEDEROVERSIKT && <h1>{veilederoversiktOverskrift}</h1>}
      </div>
      );
  }

}

export default EnhetensOversikt;
