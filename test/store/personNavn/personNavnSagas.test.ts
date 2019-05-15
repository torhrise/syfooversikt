import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentPersonNavnSaga } from '../../../src/store/personNavn/personNavnSagas';
import { PersonNavnActionTypes } from '../../../src/store/personNavn/personNavnTypes';
import { post } from '../../../src/api';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { testdata } from '../../data/fellesTestdata';
import { HOST_NAMES } from '../../../src/konstanter';

describe('hentPersonNavnSagas', () => {
  const requestBody = [{fnr: testdata.fnr1}];
  const forespurtAction = { type: PersonNavnActionTypes.HENT_PERSON_NAVN_FORESPURT, data: requestBody};
  const generator = hentPersonNavnSaga(forespurtAction);

  it(`Skal dispatche ${PersonNavnActionTypes.HENT_PERSON_NAVN_HENTER}`, () => {
    const nesteAction = put({ type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTER });
    expect(generator.next().value).to.deep.equal(nesteAction);
  });

  it('Skal dernest kalle REST-tjenesten', () => {
    const url = fullNaisUrl(HOST_NAMES.SYFOPERSON, '/syfoperson/api/person/navn');
    const nesteKall = call(post, url, forespurtAction.data);
    expect(generator.next().value).to.deep.equal(nesteKall);
  });

  it(`Skal dernest sette ${PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET}`, () => {
    const personNavnSvar = [{ fnr: testdata.fnr1, navn: testdata.navn1}];
    const nextPut = put({
      type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET,
      data: personNavnSvar,
    });
    expect(generator.next(personNavnSvar).value).to.deep.equal(nextPut);
  });
});
