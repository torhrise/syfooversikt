import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { naisGet } from '../../api/index';
import * as actions from './veilederMotebehov_actions';
import {VeilederMotebehov, VeilederMotebehovActionTypes} from './veilederMotebehovTypes';
import { finnMiljoStreng } from '../../utils/miljoUtil';

export function* hentVeilederMotebehovSaga() {
    yield put(actions.henterVeilederMotebehov());
    try {
        const url = `https://syfomotebehov${finnMiljoStreng()}.nais.preprod.local${process.env.REACT_APP_SYFOMOTEBEHOVREST_ROOT}/enhet/0315/motebehov/brukere`;          // TODO: Sett inn riktig path
        const data = yield call(naisGet, url);
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
