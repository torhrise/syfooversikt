import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from '../../api/index';
import * as actions from './veilederMotebehov_actions';
import { VeilederMotebehovActionTypes } from './veilederMotebehovTypes';
import { finnMiljoStreng } from '../../utils/miljoUtil';

export function* hentVeilederMotebehovSaga() {
    yield put(actions.henterVeilederMotebehov());
    try {
        const url = `https://app${finnMiljoStreng()}.adeo.no${process.env.REACT_APP_SYFOMOTEBEHOVREST_ROOT}/enhet/0330/motebehov/brukere`;          // TODO: Sett inn riktig path
        const data = yield call(get, url);
        yield put(actions.veilederMotebehovHentet(data));
    } catch (e) {
        yield put(actions.hentVeilederMotebehovFeilet());
    }
}

function* watchHentVeilederMotebehov() {
    yield takeEvery(
        VeilederMotebehovActionTypes.HENT_VEILEDER_MOTEBEHOV_FORESPURT,
        hentVeilederMotebehovSaga
    );
}

export default function* veilederMotebehovSagas() {
    yield [fork(watchHentVeilederMotebehov)];
}
