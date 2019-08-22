import React, {
  Component,
  Fragment,
} from 'react';
import cn from 'classnames';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';
import OversiktContainer from '../containers/OversiktContainer';

const tekster = {
  enhetensOversikt: 'Enhetens oversikt',
  minOversikt: 'Min oversikt',
};

interface StateProps {
  visning: string;
}

const getBtnClassNames = (aktiv: boolean) => {
  const aktivClass = aktiv ? 'oversiktVelger__knapp--aktiv' : undefined;
  return cn(aktivClass);
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
    const {
      ENHETENS_OVERSIKT,
      MIN_OVERSIKT,
    } = OVERSIKT_VISNING_TYPE;
    return (<Fragment>
      <div className="oversiktVelger">
        <ul>
          <li>
            <button
                className={getBtnClassNames(visning === ENHETENS_OVERSIKT)}
                aria-pressed={visning === ENHETENS_OVERSIKT}
                onClick={() => {
                  this.byttVisning(ENHETENS_OVERSIKT);
                }}>
              {tekster.enhetensOversikt}
            </button>
            <button
                className={getBtnClassNames(visning === MIN_OVERSIKT)}
                aria-pressed={visning === MIN_OVERSIKT}
                onClick={() => {
                  this.byttVisning(MIN_OVERSIKT);
                }}>
              {tekster.minOversikt}
            </button>
          </li>
        </ul>
      </div>
      <OversiktContainer type={visning}/>
    </Fragment>);
  }
}

export default OversiktVelger;
