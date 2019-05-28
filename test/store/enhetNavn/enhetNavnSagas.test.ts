import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentEnhetNavnSaga } from '../../../src/store/enhetNavn/enhetNavnSagas';
import { EnhetNavnActionTypes } from '../../../src/store/enhetNavn/enhetNavnTypes';
import { get } from '../../../src/api';
import { fullAppAdeoUrl } from '../../../src/utils/miljoUtil';
import {
  enhet,
} from '../../data/fellesTestdata';

describe('hentEnhetNavnSagas henter navn på enhet gitt enhetnummer:', () => {
  const generator = hentEnhetNavnSaga(enhet.enhetId);
  const url = fullAppAdeoUrl( `${process.env.REACT_APP_NORG2REST_ROOT}/enhet/0101`);

  it(`dispatch ${EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTER}`, () => {
    const nesteAction = put({ type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTER });
    expect(generator.next().value).to.deep.equal(nesteAction);
  });

  it(`kall ${url}'`, () => {
    const nesteKall = call(get, url);
    expect(generator.next().value).to.deep.equal(nesteKall);
  });

  it(`dispatch ${EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTET}`, () => {
    const enhetNavnSvar = { foo: 'bar' };
    const nextPut = put({
      type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTET,
      data: enhetNavnSvar,
    });
    expect(generator.next(enhetNavnSvar).value).to.deep.equal(nextPut);
  });
});
