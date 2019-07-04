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
import { hentFodselsnummerFraPersonOversikt } from '../../components/utils/util';
import * as personInfoActions from '../personInfo/personInfo_actions';
import { PersonoversiktStatus } from './personoversiktTypes';

export function* hentPersonoversikt(
    enhetId: string
) {
  yield put(actions.hentPersonoversiktHenter());
  try {
    const host = HOST_NAMES.SYFOOVERSIKTSRV;
    const path = `${process.env.REACT_APP_SYFOOVERSIKTSRVREST_ROOT}/personoversikt/enhet/${enhetId}`;
    const data = yield call(get, fullNaisUrlDefault(host, path));
    yield put(actions.hentPersonoversiktHentet(data));
    yield call(hentNavnForPersonerUtenNavn, data);
  } catch (e) {
    yield put(actions.hentPersonoversiktFeilet());
  }
}

export const hentPersonregister = (state: any) => {
  return state.personregister
      ? state.personregister
      : [];
};

export function* hentNavnForPersonerUtenNavn(data: PersonoversiktStatus[]): any {
  const fnrListe = hentFodselsnummerFraPersonOversikt(data);

  const personRegisterData = yield select(hentPersonregister);

  const filtrertListe = fnrListe.filter((fnrObjekt) => {
    return !personRegisterData[fnrObjekt.fnr] || (personRegisterData[fnrObjekt.fnr] && personRegisterData[fnrObjekt.fnr].navn === undefined);
  });

  yield put(personInfoActions.hentPersonInfoForespurt(filtrertListe));
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
