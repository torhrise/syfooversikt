import {EnhetensMotebehovState, MotebehovSvar} from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import { hentEnhetensMotebehov } from '../store/enhetensMotebehov/enhetensMotebehov_actions';
import { AlertStripeMedMelding } from '../utils/componentUtil';
import { lenkeTilModiaEnkeltperson} from '../utils/lenkeUtil';
import React, { Component } from 'react';
import {ApplicationState} from '../store/index';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {OVERSIKT_VISNING_TYPE} from '../konstanter';
import AppSpinner from '../components/AppSpinner';

const tekster = {
  overskrifter: {
    enhetensOversikt: 'Ubehandlede møtebehov',
    minOversikt: 'Denne fanen er under utvikling',
    veilederoversikt: 'Denne fanen er under utvikling'
  },
  feil: {
    hentMotebehovFeilet: 'Det skjedde en feil: Kunne ikke hente liste over ubehandlet møtebehov svar på enhet'
  }
};

interface OversiktProps {
  type: string;
}

interface StateProps {
  enhetensMotebehov: EnhetensMotebehovState;
}

interface DispatchProps {
  actions: {
    hentEnhetensMotebehov: typeof hentEnhetensMotebehov;
  };
}

interface MotebehovSvarListeProps {
  svarListe: MotebehovSvar[];
}

type OversiktContainerProps = OversiktProps & StateProps & DispatchProps;

class OversiktCont extends Component<OversiktContainerProps> {
  componentDidMount() {
    const { actions } = this.props;
    actions.hentEnhetensMotebehov();
  }

  componentDidUpdate(nextProps: OversiktContainerProps) {
    const { enhetensMotebehov } = this.props;
    if (!enhetensMotebehov.hentet && nextProps.enhetensMotebehov.hentet) {
      this.setState(enhetensMotebehov);
    }
  }

  render() {
    const { enhetensMotebehov, type } = this.props;

    return (<div className="oversiktContainer">
        { enhetensMotebehov.hentingFeilet && type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && AlertStripeMedMelding(tekster.feil.hentMotebehovFeilet, 'oversiktContainer__alertstripe')
        }
        <OversiktHeader type={type}/>
        { enhetensMotebehov.henter
          && <AppSpinner />
        }
        { enhetensMotebehov.hentet && type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && <MotebehovSvarListe svarListe={enhetensMotebehov.data}/>
        }
    </div>);
  }
}

const OversiktHeader = (oversiktsType: OversiktProps) => {
  const { type } = oversiktsType;
  return (<div>
      {type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT && <h1>{tekster.overskrifter.enhetensOversikt}</h1>}
  </div>);
};

const MotebehovSvarListe = (motebehovSvarListe: MotebehovSvarListeProps) => {
  const { svarListe } = motebehovSvarListe;
  return (<ul>
    {
      svarListe.map((svar: MotebehovSvar, idx: number) => {
        return (<li key={idx}>
          {lenkeTilModiaEnkeltperson(svar.fnr)} {svar.skjermetEllerEgenAnsatt === true ? '(SKJERMET)' : ''}
        </li>);
      })
    }
  </ul>);
};

const mapStateToProps = ({ enhetensMotebehov }: ApplicationState, ownProps: OversiktProps) => ({
  enhetensMotebehov,
  ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    hentEnhetensMotebehov: () => dispatch(hentEnhetensMotebehov()),
  },
});

const OversiktContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OversiktCont);

export default OversiktContainer;
