import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './veilederinfo_actions';
import { VeilederinfoActiontypes } from './veilederinfoTypes';

export function* hentVeilederinfoSaga() {
  // if (skalHenteVeilederinfo ) {...
  yield put(actions.henterVeilederinfo());
  try {
    const url = `${process.env.VEILEDEROPPGAVERREST_ROOT}/veilederinfo`;
    const data = yield call(get, url);
    yield put(actions.veilederinfoHentet(data));
  } catch (e) {
    yield put(actions.hentVeilederinfoFeilet());
  }
}

function* watchHentVeilederinfo() {
  yield takeEvery(
    VeilederinfoActiontypes.HENT_VEILEDERINFO_FORESPURT,
    hentVeilederinfoSaga
  );
}

export default function* veilederinfoSagas() {
  yield [fork(watchHentVeilederinfo)];
}
