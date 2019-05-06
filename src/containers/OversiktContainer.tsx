import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { EnhetensMotebehovState, MotebehovSvar } from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import { PersonregisterState } from '../store/personregister/personregisterTypes';
import { hentEnhetensMotebehovForespurt } from '../store/enhetensMotebehov/enhetensMotebehov_actions';
import { AlertStripeMedMelding } from '../components/AlertStripeMedMelding';
import { ApplicationState } from '../store';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';
import AppSpinner from '../components/AppSpinner';
import Sokeresultat from '../components/Sokeresultat';
import { hentPersonNavnForespurt } from '../store/personNavn/personNavn_actions';
import { Fodselsnummer } from '../store/personNavn/personNavnTypes';

const tekster = {
  overskrifter: {
    enhetensOversikt: 'Møtebehov på enhet',
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
  enhetensMotebehov: EnhetensMotebehovState;
  personregister: PersonregisterState;
}

interface DispatchProps {
  actions: {
    hentEnhetensMotebehovForespurt: typeof hentEnhetensMotebehovForespurt;
    hentPersonNavnForespurt: typeof hentPersonNavnForespurt;
  };
}

export type OversiktContainerProps = OversiktProps & StateProps & DispatchProps;

class OversiktCont extends Component<OversiktContainerProps> {
  componentDidMount() {
    const { actions } = this.props;
    actions.hentEnhetensMotebehovForespurt();
  }

  componentDidUpdate(prevProps: OversiktContainerProps) {
    const { enhetensMotebehov, actions } = this.props;
    if (enhetensMotebehov.hentet && prevProps.enhetensMotebehov.henter) {
      actions.hentPersonNavnForespurt(hentFodselsnummerFraMotebehovSvar(prevProps.enhetensMotebehov.data));
      this.setState(enhetensMotebehov);
    }
  }

  render() {
    const { enhetensMotebehov, type } = this.props;

    return (<div className="oversiktContainer">
        { enhetensMotebehov.hentingFeilet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && AlertStripeMedMelding(tekster.feil.hentMotebehovFeilet, 'oversiktContainer__alertstripe')
        }
        <OversiktHeader type={type}/>
        { enhetensMotebehov.henter
          && <AppSpinner />
        }
        { enhetensMotebehov.hentet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
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

const hentFodselsnummerFraMotebehovSvar = (svarListe: MotebehovSvar[]) => {
  return svarListe.map((motebehovSvar) => {
    return {fnr: motebehovSvar.fnr};
  });
};

const mapStateToProps = ({ enhetensMotebehov, personregister }: ApplicationState, oversiktProps: OversiktProps) => ({
  enhetensMotebehov,
  personregister,
  oversiktProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    hentEnhetensMotebehovForespurt: () => dispatch(hentEnhetensMotebehovForespurt()),
    hentPersonNavnForespurt: (fnrListe: Fodselsnummer[]) => dispatch(hentPersonNavnForespurt(fnrListe)),
  },
});

const OversiktContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OversiktCont);

export default OversiktContainer;
