import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { veilederArbeidstakerActionTypes } from '../../../src/store/veilederArbeidstaker/veilederArbeidstakerTypes';
import {
  pushVeilederArbeidstakerForespurt,
  pushVeilederArbeidstakerPusher,
  pushVeilederArbeidstakerPushet,
  pushVeilederArbeidstakerFeilet,
} from '../../../src/store/veilederArbeidstaker/veilederArbeidstaker_actions';
import { testdata } from '../../data/fellesTestdata';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('personNavn_actions', () => {
  it('pushVeilederArbeidstakerForespurt() skal returnere riktig action', () => {
    const payload = [{
      veilederIdent: 'Z999999',
      fnr: '123456789',
      enhet: '0001',
    }];
    expect(pushVeilederArbeidstakerForespurt(payload)).to.deep.equal({
      type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FORESPURT,
      data: payload });
  });

  it('pushVeilederArbeidstakerPusher() skal returnere riktig action', () => {
    expect(pushVeilederArbeidstakerPusher()).to.deep.equal({
      type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHER });
  });

  it('pushVeilederArbeidstakerPushet() skal returnere riktig action', () => {
    const personNavnSvar = [ { fnr: testdata.fnr1, navn: testdata.navn1} ];
    expect(pushVeilederArbeidstakerPushet()).to.deep.equal({
      type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHET});
  });

  it('pushVeilederArbeidstakerFeilet() skal returnere riktig action', () => {
    expect(pushVeilederArbeidstakerFeilet()).to.deep.equal({
      type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FEILET });
  });
});
