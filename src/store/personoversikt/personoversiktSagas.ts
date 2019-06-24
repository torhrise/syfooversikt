import {
  all,
  call,
  fork,
  put, select,
  takeEvery,
} from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './personoversikt_actions';
import { fullNaisUrlDefault } from '../../utils/miljoUtil';
import { HOST_NAMES } from '../../konstanter';
import { skalHenteReducer } from '../../utils/selectorUtil';

export function* hentPersonoversikt(
    enhetId: string
) {
  yield put(actions.hentPersonoversiktHenter());
  try {
    const host = HOST_NAMES.SYFOOVERSIKTSRV;
    const path = `${process.env.REACT_APP_SYFOOVERSIKTSRVREST_ROOT}/personoversikt/enhet/${enhetId}`;
    const data = yield call(get, fullNaisUrlDefault(host, path));
    yield put(actions.hentPersonoversiktHentet(data));
  } catch (e) {
    yield put(actions.hentPersonoversiktFeilet());
  }
}

const hentetAktivEnhetId = (state: any): string => {
  return skalHenteReducer(state.personoversikt)
      ? state.veilederenheter.aktivEnhet.enhetId
      : '';
};

export function* hentPersonoversiktHvisEnhetHentet(): any {
  const enhetId = yield select(hentetAktivEnhetId);
  if (enhetId !== '') {
    yield hentPersonoversikt(enhetId);
  }
}

function* watchHentPersonoversikt() {
  yield takeEvery(
      actions.PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_FORESPURT,
      hentPersonoversiktHvisEnhetHentet
  );
}

export default function* personoversiktSagas() {
  yield all([
    fork(watchHentPersonoversikt)
  ]);
}
