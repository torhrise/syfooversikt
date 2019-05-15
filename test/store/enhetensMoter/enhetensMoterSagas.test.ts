import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentEnhetensMoterSaga } from '../../../src/store/enhetensMoter/enhetensMoterSagas';
import { get } from '../../../src/api';
import { EnhetensMoterActionTypes } from '../../../src/store/enhetensMoter/enhetensMoterTypes';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { testdata } from '../../data/fellesTestdata';
import { HOST_NAMES } from '../../../src/konstanter';

describe('hentEnhetensMoterSagas', () => {
  const generator = hentEnhetensMoterSaga();

  it(`Skal dispatche ${EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTER}`, () => {
    const nesteAction = put({ type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTER });
    expect(generator.next().value).to.deep.equal(nesteAction);
  });

  it('Skal dernest kalle REST-tjenesten', () => {
    const url = fullNaisUrl(HOST_NAMES.SYFOMOTEADMIN, '/syfomoteadmin/api/enhet/0315/moter/brukere');
    const nesteKall = call(get, url);
    expect(generator.next().value).to.deep.equal(nesteKall);
  });

  it(`Skal dernest sette ${EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTET}`, () => {
    const moter = [{ fnr: testdata.fnr1, skjermingskode: testdata.skjermingskode.ingen}];
    const nextPut = put({
      type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTET,
      data: moter,
    });
    expect(generator.next(moter).value).to.deep.equal(nextPut);
  });
});
