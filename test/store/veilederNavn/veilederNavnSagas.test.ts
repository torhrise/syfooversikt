import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { hentVeilederNavnSaga } from '../../../src/store/veilederNavn/veilederNavnSagas';
import { get } from '../../../src/api';
import { VeilederNavnActionTypes } from '../../../src/store/veilederNavn/veilederNavnTypes';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { HOST_NAMES } from '../../../src/konstanter';
import { hentVeilederNavnForespurt } from '../../../src/store/veilederNavn/veilederNavn_actions';

describe('hentVeilederNavnSagas', () => {
  const veilederIdent = 'Z999999';
  const forespurtAction  =  hentVeilederNavnForespurt({ident: veilederIdent});
  const generator = hentVeilederNavnSaga(forespurtAction);
  const url = fullNaisUrl(HOST_NAMES.SYFOVEILEDER, `/syfoveileder/api/veileder/${veilederIdent}`);

  it(`dispatch ${VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTER}`, () => {
    const nesteAction = put({ type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTER });
    expect(generator.next().value).to.deep.equal(nesteAction);
  });

  it(`kall REST-tjenesten ${url}`, () => {
    const nesteKall = call(get, url);
    expect(generator.next().value).to.deep.equal(nesteKall);
  });

  it(`dispatch ${VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTET}`, () => {
    const veilederNavn = {
      id: veilederIdent,
      navn: 'Katherine',
      fornavn: 'Dana',
      etternavn: 'Scully',
    };
    const nextPut = put({
      type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTET,
      data: veilederNavn,
    });
    expect(generator.next(veilederNavn).value).to.deep.equal(nextPut);
  });
});
