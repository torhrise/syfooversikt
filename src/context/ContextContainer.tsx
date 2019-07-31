import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { ApplicationState } from '../store';
import { CONTEXT_EVENT_TYPE } from '../konstanter';
import { AlertStripeRod } from '../components/AlertStripeAdvarsel';
import { hentAktivEnhet } from '../store/modiacontext/modiacontext_actions';
import { HentAktivEnhetData } from '../store/modiacontext/modiacontextTypes';
import { hentVeilederinfo } from '../store/veilederinfo/veilederinfo_actions';
import { VeilederinfoState } from '../store/veilederinfo/veilederinfoTypes';
import { opprettWebsocketConnection } from './contextHolder';

const tekster = {
  feil: { hentVeilederIdentFeilet: 'Det skjedde en feil: Vi fant ikke din ident' },
};

interface StateProps {
  veilederinfo: VeilederinfoState;
}

interface DispatchProps {
  doHentEnhet: typeof hentAktivEnhet;
}

type ContextContainerProps = StateProps & DispatchProps;

const opprettWSConnection = (props: ContextContainerProps) => {
  const { doHentEnhet, veilederinfo } = props;
  const ident = veilederinfo.data.ident;

  opprettWebsocketConnection(ident, (wsCallback) => {
    if (wsCallback.data === CONTEXT_EVENT_TYPE.NY_AKTIV_ENHET) {
      doHentEnhet({
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

const Context = () => {
  const veilederinfo = useSelector((state: ApplicationState) => state.veilederinfo);
  const dispatch = useDispatch();
  const actionhentEnhet = (data: HentAktivEnhetData) =>
      dispatch(hentAktivEnhet(data));

  useEffect(() => {
    dispatch(hentVeilederinfo());
  }, []);

  useEffect(() => {
    if (veilederinfo.hentet) {
      opprettWSConnection({ doHentEnhet: actionhentEnhet, veilederinfo });
    }
  }, [veilederinfo.hentet]);

  return (
    <div className="contextContainer">
      {veilederinfo.hentingFeilet &&
        AlertStripeRod(
          tekster.feil.hentVeilederIdentFeilet,
            'contextContainer__alertstripe'
        )}
    </div>);
};

export default Context;
