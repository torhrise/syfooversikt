import { expect } from 'chai';
import { veilederArbeidstakerActionTypes } from '../../../src/store/veilederArbeidstaker/veilederArbeidstakerTypes';
import {
  call,
  put } from 'redux-saga/effects';
import { pushBrukerArbeidstakerSaga } from '../../../src/store/veilederArbeidstaker/veilederArbeidstakerSagas';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { post } from '../../../src/api';

describe('veilederArbeidstakerSagas', () => {
  describe('fordel liste av brukere til en veileder', () => {
    const payload = [{
      veilederIdent: 'Z999999',
      aktorId: '123456789',
      enhet: '0001',
    }];
    const forespurtAction  = {
      type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FORESPURT,
      data: payload};
    const generator = pushBrukerArbeidstakerSaga(forespurtAction);
    const url = fullNaisUrl('syfoperson', '/syfoperson/api/veilederbehandling/registrer');

    it(`dispatch ${veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHER}`, () => {
      const nesteAction = put({
        type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHER});
      expect(generator.next().value).to.deep.equal(nesteAction);
    });

    it(`kall ${url}`, () => {
      const nesteKall = call(post, url, forespurtAction.data);
      expect(generator.next().value).to.deep.equal(nesteKall);
    });

    it(`dispatch ${veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHET}`, () => {
      const nesteAction = put({
        type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHET});
      expect(generator.next().value).to.deep.equal(nesteAction);
    });
  });
});
