import AlertStripe from 'nav-frontend-alertstriper';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState, config } from '../index';
import { CONTEXT_EVENT_TYPE } from '../konstanter';
import { hentAktivEnhet } from '../store/modiacontext/modiacontext_actions';
import { HentAktivEnhetData } from '../store/modiacontext/modiacontextTypes';
import { hentVeilederinfo } from '../store/veilederinfo/veilederinfo_actions';
import { VeilederinfoState } from '../store/veilederinfo/veilederinfoTypes';
import { opprettWebsocketConnection } from './contextHolder';

interface StateProps {
  veilederinfoReducer: VeilederinfoState;
}

interface DispatchProps {
  actions: {
    hentAktivEnhet: typeof hentAktivEnhet;
    hentVeilederinfo: typeof hentVeilederinfo;
  };
}

type ContextContainerProps = StateProps & DispatchProps;

const opprettWSConnection = (props: ContextContainerProps) => {
  const { actions, veilederinfoReducer } = props;
  const ident = veilederinfoReducer.data.ident;

  opprettWebsocketConnection(ident, (wsCallback) => {
    if (wsCallback.data === CONTEXT_EVENT_TYPE.NY_AKTIV_ENHET) {
      actions.hentAktivEnhet({
        callback: (aktivEnhet) => {
          if (config.config.initiellEnhet !== aktivEnhet) {
            config.config.initiellEnhet = aktivEnhet;
            (window as any).renderDecoratorHead(config);
          }
        },
      });
    }
  });
};

class Context extends Component<ContextContainerProps> {
  componentDidMount() {
    const { actions } = this.props;
    actions.hentVeilederinfo();
  }

  componentDidUpdate(nextProps: ContextContainerProps) {
    const { actions, veilederinfoReducer } = this.props;

    if (!veilederinfoReducer.hentet && nextProps.veilederinfoReducer.hentet) {
      this.setState(veilederinfoReducer);
      opprettWSConnection({ actions, veilederinfoReducer });
    }
  }

  render() {
    const { veilederinfoReducer } = this.props;

    return (
      <div className="contextContainer">
        {veilederinfoReducer.hentingFeilet && (
          <AlertStripe
            className="contextContainer__alertstripe"
            type="advarsel"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: '<p>Det skjedde en feil: Vi fant ikke din ident</p>',
              }}
            />
          </AlertStripe>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ veilederinfoReducer }: ApplicationState) => ({
  veilederinfoReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    hentAktivEnhet: (data: HentAktivEnhetData) =>
      dispatch(hentAktivEnhet(data)),
    hentVeilederinfo: () => dispatch(hentVeilederinfo()),
  },
});

const ContextContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Context);

export default ContextContainer;
