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
import { hentPersonNavnForespurt } from '../store/personNavn/personNavn_actions';
import { Fodselsnummer } from '../store/personNavn/personNavnTypes';
import { pushVeilederArbeidstakerForespurt } from '../store/veilederArbeidstaker/veilederArbeidstaker_actions';
import { hentVeilederenheter } from '../store/veilederenheter/veilederenheter_actions';
import { VeilederArbeidstaker } from '../store/veilederArbeidstaker/veilederArbeidstakerTypes';
import { Veilederenhet } from '../store/veilederenheter/veilederenheterTypes';

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
  aktivEnhet: Veilederenhet;
  personregister: PersonregisterState;
  henterAlt: boolean;
  noeErHentet: boolean;
  altFeilet: boolean;
}

interface DispatchProps {
  actions: {
    hentEnhetensMotebehovForespurt: typeof hentEnhetensMotebehovForespurt;
    hentEnhetensMoterForespurt: typeof hentEnhetensMoterForespurt;
    hentPersonNavnForespurt: typeof hentPersonNavnForespurt;
    tildelVeileder: typeof pushVeilederArbeidstakerForespurt;
    hentVeilederenheter: typeof hentVeilederenheter;
  };
}

export type OversiktContainerProps = OversiktProps & StateProps & DispatchProps;

class OversiktCont extends Component<OversiktContainerProps> {
  componentDidMount() {
    const { actions } = this.props;
    actions.hentVeilederenheter();
  }

  componentDidUpdate() {
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
      actions,
      aktivEnhet,
      personregister,
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
          && <Sokeresultat
            tildelVeileder={actions.tildelVeileder}
            aktivEnhet={aktivEnhet}
            personregister={personregister}
        />}
    </div>);
  }
}

const OversiktHeader = (oversiktsType: OversiktProps) => {
  const { type } = oversiktsType;
  return (<div>
      {type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT && <h2>{tekster.overskrifter.enhetensOversikt}</h2>}
  </div>);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    hentEnhetensMotebehovForespurt: () => dispatch(hentEnhetensMotebehovForespurt()),
    hentEnhetensMoterForespurt: () => dispatch(hentEnhetensMoterForespurt()),
    hentPersonNavnForespurt: (fnrListe: Fodselsnummer[]) => dispatch(hentPersonNavnForespurt(fnrListe)),
    hentVeilederenheter: () => dispatch(hentVeilederenheter()),
    tildelVeileder: (liste: VeilederArbeidstaker[]) => dispatch(pushVeilederArbeidstakerForespurt(liste)),
  },
});

const mapStateToProps = ({ enhetensMotebehov, enhetensMoter, personregister, veilederenheter }: ApplicationState, oversiktProps: OversiktProps) => ({
  personregister,
  oversiktProps,
  aktivEnhet: veilederenheter.aktivEnhet,
  henterAlt: veilederenheter.henter || (enhetensMotebehov.henter && enhetensMoter.henter),
  noeErHentet: veilederenheter.hentet && (enhetensMotebehov.hentet || enhetensMoter.hentet),
  altFeilet: veilederenheter.hentingFeilet || (enhetensMotebehov.hentingFeilet && enhetensMoter.hentingFeilet),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OversiktCont);
