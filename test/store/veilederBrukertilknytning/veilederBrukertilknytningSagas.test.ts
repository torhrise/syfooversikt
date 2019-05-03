import { expect } from 'chai';
import { veilederBrukerTilknytningActionTypes } from '../../../src/store/veilederBrukerTilknytning/veilederBrukerTilknytningTypes';
import {
  call,
  put } from 'redux-saga/effects';
import { pushBrukerTilknytningSaga } from '../../../src/store/veilederBrukerTilknytning/veilederBrukerTilknytningSagas';
import { fullNaisUrl } from '../../../src/utils/miljoUtil';
import { post } from '../../../src/api';

describe('veilederBrukertilknytningSagas', () => {
  describe('fordel liste av brukere til en veileder', () => {
    const payload = [{
      veilederIdent: 'Z999999',
      aktorId: '123456789',
      enhet: '0001',
    }];
    const forespurtAction  = {
      type: veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_FORESPURT,
      data: payload};
    const generator = pushBrukerTilknytningSaga(forespurtAction);
    const url = fullNaisUrl('syfoperson', '/syfoperson/api/veilederbehandling/registrer');

    it(`dispatch ${veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_PUSHER}`, () => {
      const nesteAction = put({
        type: veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_PUSHER});
      expect(generator.next().value).to.deep.equal(nesteAction);
    });

    it(`kall ${url}`, () => {
      const nesteKall = call(post, url, forespurtAction.data);
      expect(generator.next().value).to.deep.equal(nesteKall);
    });

    it(`dispatch ${veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_PUSHET}`, () => {
      const nesteAction = put({
        type: veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_PUSHET});
      expect(generator.next().value).to.deep.equal(nesteAction);
    });
  });
});
