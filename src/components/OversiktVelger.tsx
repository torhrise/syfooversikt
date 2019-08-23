import React, {
  Component,
} from 'react';
import cn from 'classnames';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';
import OversiktContainer from '../containers/OversiktContainer';

const tekster = {
  enhetensOversikt: 'Enhetens oversikt',
};

interface StateProps {
  visning: string;
}

export const getBtnClassNames = (visning: string) => {
  return cn('oversiktVelger__knapp--aktiv', visning === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT);
};

class OversiktVelger extends Component<{}, StateProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      visning: OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT,
    };
    this.byttVisning = this.byttVisning.bind(this);
  }

  byttVisning(visning: string) {
    this.setState({
      visning,
    });
  }

  render() {
    const visning = this.state.visning;
    return (<>
      <div className="oversiktVelger">
        <ul>
          <li>
            <button
                className={getBtnClassNames(visning)}
                aria-pressed={visning === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT}
                onClick={() => {
                  this.byttVisning(OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT);
                }}>
              {tekster.enhetensOversikt}
            </button>
          </li>
        </ul>
      </div>
      <OversiktContainer type={visning}/>
    </>);
  }
}

export default OversiktVelger;
