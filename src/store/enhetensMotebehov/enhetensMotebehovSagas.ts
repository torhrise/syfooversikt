import {
  call,
  fork,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './enhetensMotebehov_actions';
import { fullNaisUrl } from '../../utils/miljoUtil';
import {
  hentVeilederEnhetFraState,
  skalHenteReducer,
} from '../../utils/selectorUtil';
import { HOST_NAMES } from '../../konstanter';

export function* hentEnhetensMotebehov(enhetId: string) {
  yield put(actions.hentEnhetensMotebehovHenter());
  try {
    const host = HOST_NAMES.SYFOMOTEBEHOV;
    const path = `${process.env.REACT_APP_SYFOMOTEBEHOVREST_ROOT}/enhet/${enhetId}/motebehov/brukere`;
    const url = fullNaisUrl(host, path);
    const data = yield call(get, url);
    yield put(actions.hentEnhetensMotebehovHentet(data));
  } catch (e) {
    yield put(actions.hentEnhetensMotebehovFeilet());
  }
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
