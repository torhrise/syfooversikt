import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PersonregisterState } from '../store/personregister/personregisterTypes';
import { AlertStripeMedMelding } from '../components/AlertStripeMedMelding';
import { ApplicationState } from '../store';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';
import AppSpinner from '../components/AppSpinner';
import Sokeresultat from '../components/Sokeresultat';
import { hentEnhetensMoterForespurt } from '../store/enhetensMoter/enhetensMoter_actions';
import { hentPersonInfoForespurt } from '../store/personInfo/personInfo_actions';
import { Fodselsnummer } from '../store/personInfo/personInfoTypes';
import { hentPersonoversiktForespurt } from '../store/personoversikt/personoversikt_actions';
import { pushVeilederArbeidstakerForespurt } from '../store/veilederArbeidstaker/veilederArbeidstaker_actions';
import { hentVeilederenheter } from '../store/veilederenheter/veilederenheter_actions';
import { VeilederArbeidstaker } from '../store/veilederArbeidstaker/veilederArbeidstakerTypes';
import { Veilederenhet } from '../store/veilederenheter/veilederenheterTypes';
import { Veilederinfo } from '../store/veilederinfo/veilederinfoTypes';

const tekster = {
  overskrifter: {
    enhetensOversikt: 'Personer med hendelser',
    minOversikt: 'Denne fanen er under utvikling',
    veilederoversikt: 'Denne fanen er under utvikling',
  },
  feil: {
    hentingFeilet: 'Det skjedde en feil: Kunne ikke hente liste over personer',
  },
};

interface OversiktProps {
  type: string;
}

interface StateProps {
  aktivEnhet: Veilederenhet;
  aktivVeilederinfo: Veilederinfo;
  personregister: PersonregisterState;
  henterAlt: boolean;
  noeErHentet: boolean;
  altFeilet: boolean;
}

interface DispatchProps {
  actions: {
    hentEnhetensMoterForespurt: typeof hentEnhetensMoterForespurt;
    hentPersonInfoForespurt: typeof hentPersonInfoForespurt;
    hentPersonoversiktForespurt: typeof hentPersonoversiktForespurt;
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
    actions.hentEnhetensMoterForespurt();
    actions.hentPersonoversiktForespurt();
  }

  render() {
    const {
      type,
      henterAlt,
      noeErHentet,
      altFeilet,
      actions,
      aktivEnhet,
      aktivVeilederinfo,
      personregister,
    } = this.props;
    return (<div className="oversiktContainer">
        { altFeilet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && AlertStripeMedMelding(tekster.feil.hentingFeilet, 'oversiktContainer__alertstripe')
        }
        <OversiktHeader type={type}/>
        { henterAlt
          && <AppSpinner />
        }
        { noeErHentet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && <Sokeresultat
            tildelVeileder={actions.tildelVeileder}
            aktivEnhet={aktivEnhet}
            aktivVeilederinfo={aktivVeilederinfo}
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
    hentEnhetensMoterForespurt: () => dispatch(hentEnhetensMoterForespurt()),
    hentPersonInfoForespurt: (fnrListe: Fodselsnummer[]) => dispatch(hentPersonInfoForespurt(fnrListe)),
    hentPersonoversiktForespurt: () => dispatch(hentPersonoversiktForespurt()),
    hentVeilederenheter: () => dispatch(hentVeilederenheter()),
    tildelVeileder: (liste: VeilederArbeidstaker[]) => dispatch(pushVeilederArbeidstakerForespurt(liste)),
  },
});

const mapStateToProps = ({ personoversikt, enhetensMoter, personregister, veilederenheter, veilederinfo }: ApplicationState, oversiktProps: OversiktProps) => ({
  personregister,
  oversiktProps,
  aktivEnhet: veilederenheter.aktivEnhet,
  aktivVeilederinfo: veilederinfo.data,
  henterAlt: veilederenheter.henter || veilederinfo.henter || (personoversikt.henter && enhetensMoter.henter),
  noeErHentet: veilederenheter.hentet && veilederinfo.hentet && (personoversikt.hentet || enhetensMoter.hentet),
  altFeilet: veilederenheter.hentingFeilet || veilederinfo.hentingFeilet || (personoversikt.hentingFeilet && enhetensMoter.hentingFeilet),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OversiktCont);
