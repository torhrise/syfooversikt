import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentEnhetensMotebehovSaga } from '../../../src/store/enhetensMotebehov/enhetensMotebehovSagas';
import { get } from '../../../src/api';
import { EnhetensMotebehovActionTypes } from '../../../src/store/enhetensMotebehov/enhetensMotebehovTypes';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { testdata } from '../../data/fellesTestdata';
import { HOST_NAMES } from '../../../src/konstanter';

describe('hentEnhetensMotebehovSagas', () => {
  const generator = hentEnhetensMotebehovSaga();

  it(`Skal dispatche ${EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER}`, () => {
    const nesteAction = put({ type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER });
    expect(generator.next().value).to.deep.equal(nesteAction);
  });

  it('Skal dernest kalle REST-tjenesten', () => {
    const url = fullNaisUrl(HOST_NAMES.SYFOMOTEBEHOV, '/syfomotebehov/api/enhet/0315/motebehov/brukere');
    const nesteKall = call(get, url);
    expect(generator.next().value).to.deep.equal(nesteKall);
  });

  it(`Skal dernest sette ${EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET}`, () => {
    const motebehovSvar = [{ fnr: testdata.fnr1, skjermingskode: testdata.skjermingskode.ingen}];
    const nextPut = put({
      type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET,
      data: motebehovSvar,
    });
    expect(generator.next(motebehovSvar).value).to.deep.equal(nextPut);
  });
});
