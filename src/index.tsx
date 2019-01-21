import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import history from './history';
import { CONTEXT_EVENT_TYPE } from './konstanter';
import AppRouter from './routers/AppRouter';
import rootSaga from './store';
import {
  hentAktivEnhet,
  pushModiaContext,
} from './store/modiacontext/modiacontext_actions';
import modiacontextReducer from './store/modiacontext/modiacontextReducer';
import { ModiacontextState } from './store/modiacontext/modiacontextTypes';
import veilederinfoReducer from './store/veilederinfo/veilederinfoReducer';
import { VeilederinfoState } from './store/veilederinfo/veilederinfoTypes';
import './styles/styles.css';
import { finnMiljoStreng } from './utils/miljoUtil';

export interface ApplicationState {
  modiacontextReducer: ModiacontextState;
  veilederinfoReducer: VeilederinfoState;
}

const rootReducer = combineReducers<ApplicationState>({
  modiacontextReducer,
  veilederinfoReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const config = {
  config: {
    dataSources: {
      veileder: `https://app${finnMiljoStreng()}.adeo.no/syfomoteadmin/api/veilederinfo`,
      enheter: `https://app${finnMiljoStreng()}.adeo.no/syfomoteadmin/api/veilederinfo`,
    },
    initiellEnhet: '',
    toggles: {
      visEnhetVelger: true,
      visVeileder: true,
      visSokefelt: true,
      toggleSendEventVedEnEnhet: false,
    },
    handlePersonsokSubmit: (nyttFnr: string) => {
      (window as any).location = `https://app${finnMiljoStreng()}.adeo.no/sykefravaer/${nyttFnr}`;
    },
    applicationName: 'Oppfølging',
    handleChangeEnhet: (data: string) => {
      if (config.config.initiellEnhet !== data) {
        store.dispatch(
          pushModiaContext({
            verdi: data,
            eventType: CONTEXT_EVENT_TYPE.NY_AKTIV_ENHET,
          })
        );
        config.config.initiellEnhet = data;
      }
    },
  },
};

store.dispatch(
  hentAktivEnhet({
    callback: (aktivEnhet) => {
      if (aktivEnhet && config.config.initiellEnhet !== aktivEnhet) {
        config.config.initiellEnhet = aktivEnhet;
        (window as any).renderDecoratorHead(config);
      }
    },
  })
);

(window as any).renderDecoratorHead(config);

render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById('maincontent')
);

/* tslint:disable no-unused-expression */
document.addEventListener('DOMContentLoaded', () => {
  (window as any).renderDecoratorHead &&
    (window as any).renderDecoratorHead(config);
});
/* tslint:enable no-unused-expression */

export { store, history };
