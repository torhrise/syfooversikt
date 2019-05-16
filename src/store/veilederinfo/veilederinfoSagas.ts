import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './veilederinfo_actions';
import { VeilederinfoActionTypes } from './veilederinfoTypes';
import { fullNaisUrl } from '../../utils/miljoUtil';
import { HOST_NAMES } from '../../konstanter';

export function* hentVeilederinfoSaga() {
  yield put(actions.henterVeilederinfo());
  try {
    const app = HOST_NAMES.SYFOMOTEADMIN;
    const url = fullNaisUrl(app,`/${app}/api/internad/veilederinfo')`);
    const data = yield call(get, url);
    yield put(actions.veilederinfoHentet(data));
  } catch (e) {
    yield put(actions.hentVeilederinfoFeilet());
  }
}

function* watchHentVeilederinfo() {
  yield takeEvery(
    VeilederinfoActionTypes.HENT_VEILEDERINFO_FORESPURT,
    hentVeilederinfoSaga
  );
}

export default function* veilederinfoSagas() {
  yield [fork(watchHentVeilederinfo)];
}
