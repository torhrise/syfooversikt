import { EnhetensMotebehovState } from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import { hentEnhetensMotebehov } from '../store/enhetensMotebehov/enhetensMotebehov_actions';
import React, { Component } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import {ApplicationState} from '../store/index';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import MotebehovSvarListe from '../components/MotebehovSvarListe';
import Oversikt from '../components/Oversikt';
import {HL_VISNING_TYPE} from '../konstanter';

interface OwnProps {
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

type OversiktContainerProps = OwnProps & StateProps & DispatchProps;

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
        { enhetensMotebehov.hentet && type === HL_VISNING_TYPE.ENHETENS_OVERSIKT && (
          <Oversikt type={type}/> &&
          <MotebehovSvarListe svarListe={enhetensMotebehov.data}/>
        )}
      </div>
    );
  }
}

/*
const mapStateToProps = (
  _state: AppState,
  ownProps: MyComponentOwnProps,
) => ({
  value: ownProps.value,
});
 */

const mapStateToProps = ({ enhetensMotebehov }: ApplicationState, ownProps: OwnProps) => ({
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
