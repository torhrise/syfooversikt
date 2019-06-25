import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { post } from '../../api/index';
import * as actions from './veilederArbeidstaker_actions';
import { fullNaisUrlDefault } from '../../utils/miljoUtil';
import { HOST_NAMES } from '../../konstanter';

export function* pushBrukerArbeidstakerSaga(
  action: ReturnType<typeof actions.pushVeilederArbeidstakerForespurt>
) {
  yield put(actions.pushVeilederArbeidstakerPusher());
  try {
    const body = { tilknytninger: action.data };

    const host = HOST_NAMES.SYFOOVERSIKTSRV;
    const path = `${process.env.REACT_APP_SYFOOVERSIKTSRVREST_ROOT}/persontildeling/registrer`;
    yield call(post, fullNaisUrlDefault(host, path), body);
    yield put(actions.pushVeilederArbeidstakerPushet(action.data));
  } catch (e) {
    yield put(actions.pushVeilederArbeidstakerFeilet());
  }
}

function* watchPushVeilederArbeidstaker() {
  yield takeEvery(
      actions.veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FORESPURT,
    pushBrukerArbeidstakerSaga
  );
}

export default function* veilederArbeidstakerSagas() {
  yield all([
    fork(watchPushVeilederArbeidstaker)
  ]);
}
