import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './personoversikt_actions';
import { fullNaisUrlDefault } from '../../utils/miljoUtil';
import { HOST_NAMES } from '../../konstanter';

export function* hentPersonoversiktSaga(
  action: ReturnType<typeof actions.hentPersonoversiktForespurt>
) {
  yield put(actions.hentPersonoversiktHenter());
  try {
    const host = HOST_NAMES.SYFOOVERSIKTSRV;
    const path = `${process.env.REACT_APP_SYFOOVERSIKTSRVREST_ROOT}/personoversikt/enhet/${action.enhet}`;
    yield call(get, fullNaisUrlDefault(host, path));
    yield put(actions.hentPersonoversiktHentet());
  } catch (e) {
    yield put(actions.hentPersonoversiktFeilet());
  }
}

function* watchHentPersonoversikt() {
  yield takeEvery(
      actions.personoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_FORESPURT,
      hentPersonoversiktSaga
  );
}

export default function* personoversiktSagas() {
  yield all([
    fork(watchHentPersonoversikt)
  ]);
}
