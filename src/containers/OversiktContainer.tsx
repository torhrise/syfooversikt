import { EnhetensMotebehovState } from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import { hentEnhetensMotebehov } from '../store/enhetensMotebehov/enhetensMotebehov_actions';
import React, { Component } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import {ApplicationState} from '../store/index';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import MotebehovSvarListe from '../components/MotebehovSvarListe';

interface StateProps {
  enhetensMotebehov: EnhetensMotebehovState;
}

interface DispatchProps {
  actions: {
    hentEnhetensMotebehov: typeof hentEnhetensMotebehov;
  };
}

type OversiktContainerProps = StateProps & DispatchProps;

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
    const { enhetensMotebehov } = this.props;

    return (
      <div className="oversiktContainer">
        { enhetensMotebehov.hentingFeilet && (
          <AlertStripe
            className="oversiktContainer__alertstripe"
            type="advarsel"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: '<p>Det skjedde en feil: Kunne ikke hente liste over møtebehov svar på enhet</p>',
              }}
            />
          </AlertStripe>
        )}
        { enhetensMotebehov.hentet && (
          <MotebehovSvarListe svarListe={enhetensMotebehov.data}/>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ enhetensMotebehov }: ApplicationState) => ({
  enhetensMotebehov,
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
