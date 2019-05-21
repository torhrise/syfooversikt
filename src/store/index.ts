import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { ModiacontextState } from './modiacontext/modiacontextTypes';
import { VeilederenheterState } from './veilederenheter/veilederenheterTypes';
import { VeilederinfoState } from './veilederinfo/veilederinfoTypes';
import { EnhetensMotebehovState } from './enhetensMotebehov/enhetensMotebehovTypes';
import { EnhetensMoterState } from './enhetensMoter/enhetensMoterTypes';
import { PersonNavnState } from './personNavn/personNavnTypes';
import { PersonregisterState } from './personregister/personregisterTypes';
import modiacontextReducer from './modiacontext/modiacontextReducer';
import veilederenheterReducer from './veilederenheter/veilederenheterReducer';
import veilederinfoReducer from './veilederinfo/veilederinfoReducer';
import enhetensMotebehovReducer from './enhetensMotebehov/enhetensMotebehovReducer';
import enhetensMoterReducer from './enhetensMoter/enhetensMoterReducer';
import personNavnReducer from './personNavn/personNavnReducer';
import personregisterReducer from './personregister/personregisterReducer';
import modiacontextSagas from './modiacontext/modiacontextSagas';
import veilederenheterSagas from './veilederenheter/veilederenheterSagas';
import veilederinfoSagas from './veilederinfo/veilederinfoSagas';
import enhetensMotebehovSagas from './enhetensMotebehov/enhetensMotebehovSagas';
import enhetensMoterSagas from './enhetensMoter/enhetensMoterSagas';
import personNavnSagas from './personNavn/personNavnSagas';
import createHashHistory from 'history/createHashHistory';
import configureStore from './configureStore';
import veilederArbeidstakerSagas from './veilederArbeidstaker/veilederArbeidstakerSagas';

export interface ApplicationState {
  modiacontext: ModiacontextState;
  veilederenheter: VeilederenheterState;
  veilederinfo: VeilederinfoState;
  enhetensMotebehov: EnhetensMotebehovState;
  enhetensMoter: EnhetensMoterState;
  personNavn: PersonNavnState;
  personregister: PersonregisterState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<ApplicationState>({
  modiacontext: modiacontextReducer,
  veilederenheter: veilederenheterReducer,
  veilederinfo: veilederinfoReducer,
  enhetensMotebehov: enhetensMotebehovReducer,
  enhetensMoter: enhetensMoterReducer,
  personNavn: personNavnReducer,
  personregister: personregisterReducer,
});

export function* rootSaga() {
  yield all([
    fork(modiacontextSagas),
    fork(veilederenheterSagas),
    fork(veilederinfoSagas),
    fork(enhetensMotebehovSagas),
    fork(enhetensMoterSagas),
    fork(personNavnSagas),
    fork(personNavnSagas),
    fork(veilederArbeidstakerSagas),
  ]);
}

const history = createHashHistory();

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

export { store, history };
