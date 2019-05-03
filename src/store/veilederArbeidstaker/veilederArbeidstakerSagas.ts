import {
  all,
  call,
  fork,
  put,
  takeEvery
} from 'redux-saga/effects';
import { post } from '../../api/index';
import * as actions from './veilederArbeidstaker_actions';
import { veilederArbeidstakerActionTypes } from './veilederArbeidstakerTypes';
import { fullNaisUrl } from '../../utils/miljoUtil';

export function* pushBrukerArbeidstakerSaga(
  action: ReturnType<typeof actions.pushVeilederArbeidstakerForespurt>
) {
  yield put(actions.pushVeilederArbeidstakerPusher());
  try {
    const host = 'syfoperson';
    const path = `${process.env.REACT_APP_SYFOPERSONREST_ROOT}/veilederbehandling/registrer`;
    yield call(post, fullNaisUrl(host, path), action.data);
    yield put(actions.pushVeiledeArbeidstakerPushet());
  } catch (e) {
    yield put(actions.pushVeilederArbeidstakerFeilet());
  }
}

function* watchPushVeilederArbeidstaker() {
  yield takeEvery(
    veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FORESPURT,
    pushBrukerArbeidstakerSaga
  );
}

export default function* veilederArbeidstakerSagas() {
  yield all([
    fork(watchPushVeilederArbeidstaker)
  ]);
}
