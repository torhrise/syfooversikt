import {
  call,
  fork,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './enhetensMoter_actions';
import { EnhetensMoterActionTypes } from './enhetensMoterTypes';
import { fullNaisUrl } from '../../utils/miljoUtil';
import * as personNavnActions from '../personNavn/personNavn_actions';
import { PersonHendelseData } from '../personregister/personregisterTypes';
import { hentFodselsnummerFraPersonHendelseListe } from '../../components/utils/util';
import { HOST_NAMES } from '../../konstanter';

export function* hentEnhetensMoterSaga() {
  yield put(actions.hentEnhetensMoterHenter());
  try {
    const host = HOST_NAMES.SYFOMOTEADMIN;
    const path = `${process.env.REACT_APP_SYFOMOTEADMIN_ROOT}/enhet/0315/moter/brukere`;
    const url = fullNaisUrl(host, path);
    const data = yield call(get, url);
    yield put(actions.hentEnhetensMoterHentet(data));
    yield call(hentNavnForPersonerMedMoteUtenNavn, data);
  } catch (e) {
    yield put(actions.hentEnhetensMoterFeilet());
  }
}

export function hentPersonregister(state: any) {
  return state.personregister
    ? state.personregister
    : [];
}

export function* hentNavnForPersonerMedMoteUtenNavn(data: PersonHendelseData[]): any {
  const fnrListe = hentFodselsnummerFraPersonHendelseListe(data);

  const personRegisterData = yield select(hentPersonregister);

  const filtrertListe = fnrListe.filter((fnrObjekt) => {
    return !personRegisterData[fnrObjekt.fnr] || (personRegisterData[fnrObjekt.fnr] && personRegisterData[fnrObjekt.fnr].navn === undefined);
  });

  yield put(personNavnActions.hentPersonNavnForespurt(filtrertListe));
}

function* watchHentEnhetensMoter() {
  yield takeEvery(
    EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FORESPURT,
    hentEnhetensMoterSaga
  );
}

export default function* enhetensMoterSagas() {
  yield [fork(watchHentEnhetensMoter)];
}
