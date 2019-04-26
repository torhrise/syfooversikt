import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {post} from '../../api/index';
import * as actions from './veilederBrukerTilknytning_actions';
import {veilederBrukerTilknytningActionTypes} from './veilederBrukerTilknytningTypes';
import {fullNaisUrl} from '../../utils/miljoUtil';

export function* pushBrukerTilknytningSaga(
  action: ReturnType<typeof actions.pushVeilederBrukerTilknytning>
) {
  yield put(actions.pusherVeilederBrukerTilknytning());
  try {
    const host = 'syfoperson';
    const path = `${process.env.REACT_APP_SYFOPERSONREST_ROOT}/veilederbehandling/registrer`;
    yield call(post, fullNaisUrl(host, path), action.data);
    yield put(actions.veilederBrukerTilknytningPushet());
  } catch (e) {
    yield put(actions.pushVeilederBrukerTilknytningFeilet());
  }
}

function* watchPushVeilederBrukerTilknytning() {
  yield takeEvery(
    veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_FORESPURT,
    pushBrukerTilknytningSaga
  );
}

export default function* veilederBrukerTilknytningSagas() {
  yield all([
    fork(watchPushVeilederBrukerTilknytning)
  ]);
}
