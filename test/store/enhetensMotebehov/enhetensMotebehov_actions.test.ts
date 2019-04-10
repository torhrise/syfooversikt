import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { EnhetensMotebehovActionTypes } from '../../../src/store/enhetensMotebehov/enhetensMotebehovTypes';
import {
  hentEnhetensMotebehovForespurt,
  hentEnhetensMotebehovHenter,
  hentEnhetensMotebehovHentet,
  hentEnhetensMotebehovFeilet,
} from '../../../src/store/enhetensMotebehov/enhetensMotebehov_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('enhetensMotebehov_actions', () => {
  it('hentEnhetensMotebehovForespurt() skal returnere riktig action', () => {
    expect(hentEnhetensMotebehovForespurt()).to.deep.equal({ type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FORESPURT });
  });

  it('hentEnhetensMotebehovHenter() skal returnere riktig action', () => {
    expect(hentEnhetensMotebehovHenter()).to.deep.equal({ type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER });
  });

  it('hentEnhetensMotebehovHentet() skal returnere riktig action', () => {
    const motebehovSvar = [ { fnr: '99999911111', skjermingskode: 'INGEN'} ];
    expect(hentEnhetensMotebehovHentet(motebehovSvar)).to.deep.equal({ type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET, data: motebehovSvar });
  });

  it('hentEnhetensMotebehovFeilet() skal returnere riktig action', () => {
    expect(hentEnhetensMotebehovFeilet()).to.deep.equal({ type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FEILET });
  });
});
