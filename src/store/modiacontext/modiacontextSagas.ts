import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { get, post } from '../../api/index';
import { fullNaisUrl } from '../../utils/miljoUtil';
import * as actions from './modiacontext_actions';
import { modiacontextActionTypes } from './modiacontextTypes';
import { HOST_NAMES } from '../../konstanter';

export function* pushModiacontextSaga(
  action: ReturnType<typeof actions.pushModiaContext>
) {
  yield put(actions.pusherModiaContext());
  try {
    const app = HOST_NAMES.MODIACONTEXTHOLDER;
    const url = fullNaisUrl(app,`/${app}/api/context')`);
    yield call(
      post,
      url,
      {
        verdi: action.data.verdi,
        eventType: action.data.eventType,
      }
    );
    yield put(actions.modiaContextPushet());
  } catch (e) {
    yield put(actions.pushModiaContextFeilet());
  }
}

export function* aktivEnhetSaga(
  action: ReturnType<typeof actions.hentAktivEnhet>
) {
  yield put(actions.henterAktivEnhet());
  try {
    const app = HOST_NAMES.MODIACONTEXTHOLDER;
    const url = fullNaisUrl(app,`/${app}/api/context/aktivenhet`);
    const data = yield call(
      get,
      url
    );
    action.data.callback(data.aktivEnhet);
  } catch (e) {
    yield put(actions.hentAktivEnhetFeilet());
  }
}

function* watchPushModiacontext() {
  yield takeEvery(
    modiacontextActionTypes.PUSH_MODIACONTEXT_FORESPURT,
    pushModiacontextSaga
  );
}

function* watchAktivEnhet() {
  yield takeEvery(
    modiacontextActionTypes.HENT_AKTIVENHET_FORESPURT,
    aktivEnhetSaga
  );
}

export default function* modiacontextSagas() {
  yield all([
    fork(watchPushModiacontext),
    fork(watchAktivEnhet)
  ]);
}
