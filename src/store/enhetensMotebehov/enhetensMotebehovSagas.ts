import {
  call,
  fork,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './enhetensMotebehov_actions';
import * as personNavnActions from '../personNavn/personNavn_actions';
import { EnhetensMotebehovActionTypes } from './enhetensMotebehovTypes';
import { fullNaisUrl } from '../../utils/miljoUtil';
import { hentFodselsnummerFraPersonHendelseListe } from '../../components/utils/util';
import { PersonHendelseData } from '../personregister/personregisterTypes';
import { HOST_NAMES } from '../../konstanter';

export function* hentEnhetensMotebehovSaga() {
  yield put(actions.hentEnhetensMotebehovHenter());
  try {
    const host = HOST_NAMES.SYFOMOTEBEHOV;
    const path = `${process.env.REACT_APP_SYFOMOTEBEHOVREST_ROOT}/enhet/0315/motebehov/brukere`;
    const url = fullNaisUrl(host, path);
    const data = yield call(get, url);
    yield put(actions.hentEnhetensMotebehovHentet(data));
    yield call(hentNavnForPersonerUtenNavn, data);
  } catch (e) {
    yield put(actions.hentEnhetensMotebehovFeilet());
  }
}

export function hentPersonregister(state: any) {
  return state.personregister
    ? state.personregister
    : [];
}

export function* hentNavnForPersonerUtenNavn(data: PersonHendelseData[]): any {
  console.log('L-TRACE: Motebehov Data: ', data); //tslint:disable-line
  const fnrListe = hentFodselsnummerFraPersonHendelseListe(data);

  const personRegisterData = yield select(hentPersonregister);
  console.log('L-TRACE: Motebehov personregister: ', personRegisterData); //tslint:disable-line

  const filtrertListe = fnrListe.filter((fnrObjekt) => {
    return !personRegisterData[fnrObjekt.fnr] || (personRegisterData[fnrObjekt.fnr] && personRegisterData[fnrObjekt.fnr].navn === undefined);
  });
  console.log('L-TRACE: Motebehov filtrertListe: ', filtrertListe); //tslint:disable-line

  yield put(personNavnActions.hentPersonNavnForespurt(filtrertListe));
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
