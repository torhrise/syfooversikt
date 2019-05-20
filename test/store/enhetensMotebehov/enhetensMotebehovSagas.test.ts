import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentEnhetensMotebehov } from '../../../src/store/enhetensMotebehov/enhetensMotebehovSagas';
import { get } from '../../../src/api';
import { EnhetensMotebehovActionTypes } from '../../../src/store/enhetensMotebehov/enhetensMotebehovTypes';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { HOST_NAMES } from '../../../src/konstanter';
import {
  enhet,
  testdata,
} from '../../data/fellesTestdata';

describe('hentEnhetensMotebehovSagas', () => {
  const generator = hentEnhetensMotebehov(enhet.enhetId);

  it(`Skal dispatche ${EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER}`, () => {
    const nesteAction = put({ type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER });
    expect(generator.next().value).to.deep.equal(nesteAction);
  });

  it('Skal dernest kalle REST-tjenesten', () => {
    const url = fullNaisUrl(HOST_NAMES.SYFOMOTEBEHOV, `/syfomotebehov/api/enhet/${enhet.enhetId}/motebehov/brukere`);
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
