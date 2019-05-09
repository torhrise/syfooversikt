import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PersonregisterState } from '../store/personregister/personregisterTypes';
import { hentEnhetensMotebehovForespurt } from '../store/enhetensMotebehov/enhetensMotebehov_actions';
import { AlertStripeMedMelding } from '../components/AlertStripeMedMelding';
import { ApplicationState } from '../store';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';
import AppSpinner from '../components/AppSpinner';
import Sokeresultat from '../components/Sokeresultat';
import { hentEnhetensMoterForespurt } from '../store/enhetensMoter/enhetensMoter_actions';

const tekster = {
  overskrifter: {
    enhetensOversikt: 'Personer med hendelser',
    minOversikt: 'Denne fanen er under utvikling',
    veilederoversikt: 'Denne fanen er under utvikling',
  },
  feil: {
    hentMotebehovFeilet: 'Det skjedde en feil: Kunne ikke hente liste over møtebehov svar på enhet',
  },
};

interface OversiktProps {
  type: string;
}

interface StateProps {
  personregister: PersonregisterState;
  henterAlt: boolean;
  noeErHentet: boolean;
  altFeilet: boolean;
}

interface DispatchProps {
  actions: {
    hentEnhetensMotebehovForespurt: typeof hentEnhetensMotebehovForespurt;
    hentEnhetensMoterForespurt: typeof hentEnhetensMoterForespurt;
  };
}

export type OversiktContainerProps = OversiktProps & StateProps & DispatchProps;

class OversiktCont extends Component<OversiktContainerProps> {
  componentDidMount() {
    const { actions } = this.props;
    actions.hentEnhetensMotebehovForespurt();
    actions.hentEnhetensMoterForespurt();
  }

  render() {
    const {
      type,
      henterAlt,
      noeErHentet,
      altFeilet,
    } = this.props;

    return (<div className="oversiktContainer">
        { altFeilet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && AlertStripeMedMelding(tekster.feil.hentMotebehovFeilet, 'oversiktContainer__alertstripe')
        }
        <OversiktHeader type={type}/>
        { henterAlt
          && <AppSpinner />
        }
        { noeErHentet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && <Sokeresultat {...this.props} />
        }
    </div>);
  }
}

const OversiktHeader = (oversiktsType: OversiktProps) => {
  const { type } = oversiktsType;
  return (<div>
      {type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT && <h2>{tekster.overskrifter.enhetensOversikt}</h2>}
  </div>);
};

const mapStateToProps = ({ enhetensMotebehov, enhetensMoter, personregister }: ApplicationState, oversiktProps: OversiktProps) => ({
  personregister,
  oversiktProps,
  henterAlt: enhetensMotebehov.henter && enhetensMoter.henter,
  noeErHentet: enhetensMotebehov.hentet || enhetensMoter.hentet,
  altFeilet: enhetensMotebehov.hentingFeilet && enhetensMoter.hentingFeilet,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    hentEnhetensMotebehovForespurt: () => dispatch(hentEnhetensMotebehovForespurt()),
    hentEnhetensMoterForespurt: () => dispatch(hentEnhetensMoterForespurt()),
  },
});

const OversiktContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OversiktCont);

export default OversiktContainer;
