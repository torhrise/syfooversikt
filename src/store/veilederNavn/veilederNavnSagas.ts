import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './veilederNavn_actions';
import { VeilederNavnActionTypes } from './veilederNavnTypes';
import { fullNaisUrl } from '../../utils/miljoUtil';
import { HOST_NAMES } from '../../konstanter';

export function* hentVeilederNavnSaga(action: ReturnType<typeof actions.hentVeilederNavnForespurt>) {
  yield put(actions.hentVeilederNavnHenter());
  try {
    const host = HOST_NAMES.SYFOVEILEDER;
    const path = `${process.env.REACT_APP_SYFOVEILEDER_ROOT}/veileder/${action.navident.ident}`;
    const url = fullNaisUrl(host, path);
    const data = yield call(get, url);
    yield put(actions.hentVeilederNavnHentet(data));
  } catch (e) {
    yield put(actions.hentVeilederNavnFeilet());
  }
}

function* watchHentVeilederNavn() {
  yield takeEvery(
    VeilederNavnActionTypes.HENT_VEILEDER_NAVN_FORESPURT,
    hentVeilederNavnSaga
  );
}

export default function* personNavnSagas() {
  yield [fork(watchHentVeilederNavn)];
}
