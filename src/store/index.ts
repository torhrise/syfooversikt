import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { ModiacontextState } from './modiacontext/modiacontextTypes';
import { VeilederinfoState } from './veilederinfo/veilederinfoTypes';
import { VeilederMotebehovState} from './veilederMotebehov/veilederMotebehovTypes';
import modiacontextReducer from './modiacontext/modiacontextReducer';
import veilederinfoReducer from './veilederinfo/veilederinfoReducer';
import veilederMotebehovReducer from './veilederMotebehov/veilederMotebehovReducer';
import modiacontextSagas from './modiacontext/modiacontextSagas';
import veilederinfoSagas from './veilederinfo/veilederinfoSagas';
import veilederMotebehovSagas from './veilederMotebehov/veilederMotebehovSagas';

export interface ApplicationState {
  modiacontext: ModiacontextState;
  veilederinfo: VeilederinfoState;
  veilederMotebehov: VeilederMotebehovState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<ApplicationState>({
  modiacontext: modiacontextReducer,
  veilederinfo: veilederinfoReducer,
  veilederMotebehov: veilederMotebehovReducer,
});

export function* rootSaga() {
  yield all([
    fork(modiacontextSagas),
    fork(veilederinfoSagas),
    fork(veilederMotebehovSagas),
  ]);
}
