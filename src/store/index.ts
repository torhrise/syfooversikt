import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { ModiacontextState } from './modiacontext/modiacontextTypes';
import { VeilederinfoState } from './veilederinfo/veilederinfoTypes';
import { EnhetensMotebehovState } from './enhetensMotebehov/enhetensMotebehovTypes';
import { PersonNavnState} from './personNavn/personNavnTypes';
import { PersonregisterState } from './personregister/personregisterTypes';
import modiacontextReducer from './modiacontext/modiacontextReducer';
import veilederinfoReducer from './veilederinfo/veilederinfoReducer';
import enhetensMotebehovReducer from './enhetensMotebehov/enhetensMotebehovReducer';
import personNavnReducer from './personNavn/personNavnReducer';
import personregisterReducer from './personregister/personregisterReducer';
import modiacontextSagas from './modiacontext/modiacontextSagas';
import veilederinfoSagas from './veilederinfo/veilederinfoSagas';
import enhetensMotebehovSagas from './enhetensMotebehov/enhetensMotebehovSagas';
import personNavnSagas from './personNavn/personNavnSagas';

export interface ApplicationState {
  modiacontext: ModiacontextState;
  veilederinfo: VeilederinfoState;
  enhetensMotebehov: EnhetensMotebehovState;
  personNavn: PersonNavnState;
  personregister: PersonregisterState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<ApplicationState>({
  modiacontext: modiacontextReducer,
  veilederinfo: veilederinfoReducer,
  enhetensMotebehov: enhetensMotebehovReducer,
  personNavn: personNavnReducer,
  personregister: personregisterReducer,
});

export function* rootSaga() {
  yield all([
    fork(modiacontextSagas),
    fork(veilederinfoSagas),
    fork(enhetensMotebehovSagas),
    fork(personNavnSagas),
  ]);
}
