import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { post } from '../../api/index';
import * as actions from './personNavn_actions';
import { PersonNavnActionTypes } from './personNavnTypes';
import { fullNaisUrl } from '../../utils/miljoUtil';
import { HOST_NAMES } from '../../konstanter';

export function* hentPersonNavnSaga(action: ReturnType<typeof actions.hentPersonNavnForespurt>) {
  yield put(actions.hentPersonNavnHenter());
  try {
    const host = HOST_NAMES.SYFOPERSON;
    const path = `${process.env.REACT_APP_SYFOPERSONREST_ROOT}/person/navn`;
    const url = fullNaisUrl(host, path);
    const data = yield call(post, url, action.data);
    yield put(actions.hentPersonNavnHentet(data));
  } catch (e) {
    yield put(actions.hentPersonNavnFeilet());
  }
}

function* watchHentPersonNavn() {
  yield takeEvery(
    PersonNavnActionTypes.HENT_PERSON_NAVN_FORESPURT,
    hentPersonNavnSaga
  );
}

export default function* personNavnSagas() {
  yield [fork(watchHentPersonNavn)];
}
