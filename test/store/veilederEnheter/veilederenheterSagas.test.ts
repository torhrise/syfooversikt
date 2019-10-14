import { expect } from 'chai';
import {
  call,
  put,
} from 'redux-saga/effects';
import { get } from '../../../src/api';
import { hentVeilederenheter } from '../../../src/store/veilederenheter/veilederenheterSagas';
import { VeilederenheterActionTypes } from '../../../src/store/veilederenheter/veilederenheter_actions';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { enhet } from '../../data/fellesTestdata';
import { HOST_NAMES } from '../../../src/konstanter';

describe('veilederenheterSagas', () => {
  const generator = hentVeilederenheter();

  it(`Skal dispatche ${VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTER}`, () => {
    const nesteAction = put({ type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTER });
    expect(generator.next().value).to.deep.equal(nesteAction);
  });

  it('Skal dernest kalle REST-tjenesten', () => {
    const url = fullNaisUrl(HOST_NAMES.SYFOMOTEADMIN, '/syfomoteadmin/api/internad/veilederinfo/enheter');
    const nesteKall = call(get, url);
    expect(generator.next().value).to.deep.equal(nesteKall);
  });

  it(`Skal dernest sette ${VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTET}`, () => {
    const data =  {
      enhetliste: [
        enhet
      ],
    };
    const nextPut = put({
      type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTET,
      data,
    });
    expect(generator.next(data).value).to.deep.equal(nextPut);
  });
});
