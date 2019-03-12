import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './enhetensMotebehov_actions';
import { EnhetensMotebehovActionTypes } from './enhetensMotebehovTypes';
import { finnNaisUrl } from '../../utils/miljoUtil';
import { hentEnhetensMotebehov } from './enhetensMotebehov_actions';

export function* hentEnhetensMotebehovSaga() {
  yield put(actions.henterEnhetensMotebehov());
  try {
    const url = `https://syfomotebehov${finnNaisUrl()}${process.env.REACT_APP_SYFOMOTEBEHOVREST_ROOT}/enhet/0315/motebehov/brukere`;
    const data = yield call(get, url);
    yield put(actions.enhetensMotebehovHentet(data));
  } catch (e) {
    yield put(actions.hentEnhetensMotebehovFeilet());
  }
}

function* watchHentEnhetensMotebehov() {
  yield takeEvery(
    EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FORESPURT,
    hentEnhetensMotebehovSaga
  );
}

export default function* enhetensMotebehovSagas() {
  yield [fork(watchHentEnhetensMotebehov)];
}
