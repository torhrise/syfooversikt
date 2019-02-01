import { combineReducers, Dispatch, Action, AnyAction } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { ModiacontextState } from './modiacontext/modiacontextTypes';
import { VeilederinfoState } from './veilederinfo/veilederinfoTypes';
import modiacontextReducer from './modiacontext/modiacontextReducer';
import veilederinfoReducer from './veilederinfo/veilederinfoReducer';
import modiacontextSagas from './modiacontext/modiacontextSagas';
import veilederinfoSagas from './veilederinfo/veilederinfoSagas';

export interface ApplicationState {
  modiacontext: ModiacontextState;
  veilederinfo: VeilederinfoState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<ApplicationState>({
  modiacontext: modiacontextReducer,
  veilederinfo: veilederinfoReducer,
});

export function* rootSaga() {
  yield all([
    fork(modiacontextSagas),
    fork(veilederinfoSagas),
  ]);
}
