import { EnhetensMotebehovState } from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import { hentEnhetensMotebehov } from '../store/enhetensMotebehov/enhetensMotebehov_actions';
import { AlertStripeMedMelding } from '../components/AlterStripeMedMelding';
import React, { Component } from 'react';
import { ApplicationState } from '../store/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';
import AppSpinner from '../components/AppSpinner';
import PersonlisteContainer from './PersonerContainer';

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
}

interface DispatchProps {
  actions: {
    hentEnhetensMotebehov: typeof hentEnhetensMotebehov;
  };
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
        { enhetensMotebehov.hentingFeilet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && AlertStripeMedMelding(tekster.feil.hentMotebehovFeilet, 'oversiktContainer__alertstripe')
        }
        <OversiktHeader type={type}/>
        { enhetensMotebehov.henter
          && <AppSpinner />
        }
        { enhetensMotebehov.hentet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && <PersonlisteContainer svarListe={enhetensMotebehov.data} />
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
  mapDispatchToProps,
)(OversiktCont);

export default OversiktContainer;
