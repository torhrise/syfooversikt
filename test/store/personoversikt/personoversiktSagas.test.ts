import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../../src/api';
import { HOST_NAMES } from '../../../src/konstanter';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { personoversikt } from '../../data/fellesTestdata';
import { hentPersonoversikt } from '../../../src/store/personoversikt/personoversiktSagas';
import { PersonoversiktActionTypes } from '../../../src/store/personoversikt/personoversikt_actions';

describe('personoversiktSagas', () => {
  const enhetId = '0101';
  const generator = hentPersonoversikt(enhetId);

  it(`Skal dispatche ${PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTER}`, () => {
    const nesteAction = put({ type: PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTER });
    expect(generator.next().value).to.deep.equal(nesteAction);
  });

  it('Skal dernest kalle REST-tjenesten', () => {
    const url = fullNaisUrl(HOST_NAMES.SYFOOVERSIKTSRV, `/api/v1/personoversikt/enhet/${enhetId}`);
    const nesteKall = call(get, url);
    expect(generator.next().value).to.deep.equal(nesteKall);
  });

  it(`Skal dernest sette ${PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTET}`, () => {
    const data = [...personoversikt];
    const nextPut = put({
      type: PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTET,
      data,
    });
    expect(generator.next(data).value).to.deep.equal(nextPut);
  });
});
