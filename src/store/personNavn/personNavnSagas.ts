import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get, post } from '../../api/index';
import * as actions from './personNavn_actions';
import {AktorId, PersonNavnActionTypes} from './personNavnTypes';
import { finnNaisUrl } from '../../utils/miljoUtil';

export function* hentPersonNavnSaga(action: ReturnType<typeof actions.hentPersonNavn>) {
  yield put(actions.henterPersonNavn());
  try {
    const url = `https://syfoperson${finnNaisUrl()}${process.env.REACT_APP_SYFOPERSONREST_ROOT}/person/navn`;
    const data = yield call(post, url, action.data);
    yield put(actions.personNavnHentet(data));
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
