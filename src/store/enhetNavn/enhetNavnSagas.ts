import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './enhetNavn_actions';
import { EnhetNavnActionTypes } from './enhetNavnTypes';
import { fullAppAdeoUrl } from '../../utils/miljoUtil';

export function* hentEnhetNavnSaga(action: ReturnType<typeof actions.hentEnhetNavnForespurt>) {
  yield put(actions.hentEnhetNavnHenter());
  try {
    const enhetNummer = action.data.id;
    // TODO: Skal være med / før enhet
    const path = `${process.env.REACT_APP_NORG2REST_ROOT}/enhet/${enhetNummer}`;
    const url = fullAppAdeoUrl(path);
    const data = yield call(get, url);
    yield put(actions.hentEnhetNavnHentet(data));
  } catch (e) {
    yield put(actions.hentEnhetNavnFeilet());
  }
}

function* watchHentEnhetNavn() {
  yield takeEvery(
    EnhetNavnActionTypes.HENT_ENHET_NAVN_FORESPURT,
    hentEnhetNavnSaga
  );
}

export default function* enhetNavnSagas() {
  yield [fork(watchHentEnhetNavn)];
}
