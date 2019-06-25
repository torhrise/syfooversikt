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
import { fullNaisUrl } from '../../utils/miljoUtil';
import {
  hentVeilederEnhetFraState,
  skalHenteReducer,
} from '../../utils/selectorUtil';
import { hentFodselsnummerFraPersonHendelseListe } from '../../components/utils/util';
import { PersonHendelseData } from '../personregister/personregisterTypes';
import { HOST_NAMES } from '../../konstanter';

export function* hentEnhetensMotebehov(enhetId: string) {
  yield put(actions.hentEnhetensMotebehovHenter());
  try {
    const host = HOST_NAMES.SYFOMOTEBEHOV;
    const path = `${process.env.REACT_APP_SYFOMOTEBEHOVREST_ROOT}/enhet/${enhetId}/motebehov/brukere`;
    const url = fullNaisUrl(host, path);
    const data = yield call(get, url);
    yield put(actions.hentEnhetensMotebehovHentet(data));
    yield call(hentNavnForPersonerUtenNavn, data);
  } catch (e) {
    yield put(actions.hentEnhetensMotebehovFeilet());
  }
}

export const hentPersonregister = (state: any) => {
  return state.personregister
    ? state.personregister
    : [];
};

export function* hentNavnForPersonerUtenNavn(data: PersonHendelseData[]): any {
  const fnrListe = hentFodselsnummerFraPersonHendelseListe(data);

  const personRegisterData = yield select(hentPersonregister);

  const filtrertListe = fnrListe.filter((fnrObjekt) => {
    return !personRegisterData[fnrObjekt.fnr] || (personRegisterData[fnrObjekt.fnr] && personRegisterData[fnrObjekt.fnr].navn === undefined);
  });

  yield put(personNavnActions.hentPersonNavnForespurt(filtrertListe));
}

export const hentetEnhet = (state: any) => {
  if(skalHenteReducer(state.enhetensMotebehov)) {
    return hentVeilederEnhetFraState(state);
  }
};

export function* hentEnhetensMotebehovHvisEnhetHentet(): any {
  const enhet = yield select(hentetEnhet);
  if (!!enhet) {
    yield hentEnhetensMotebehov(enhet.enhetId);
  }
}

function* watchHentEnhetensMotebehov() {
  yield takeEvery(
    actions.EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FORESPURT,
    hentEnhetensMotebehovHvisEnhetHentet
  );
}

export default function* enhetensMotebehovSagas() {
  yield [fork(watchHentEnhetensMotebehov)];
}
