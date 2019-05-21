import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { EnhetensMotebehovActionTypes } from '../../../src/store/enhetensMotebehov/enhetensMotebehov_actions';
import {
  hentEnhetensMotebehovForespurt,
  hentEnhetensMotebehovHenter,
  hentEnhetensMotebehovHentet,
  hentEnhetensMotebehovFeilet,
} from '../../../src/store/enhetensMotebehov/enhetensMotebehov_actions';
import { testdata } from '../../data/fellesTestdata';
import { PersonHendelseData } from '../../../src/store/personregister/personregisterTypes';

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
    const motebehovSvar = [ { fnr: testdata.fnr1, skjermingskode: testdata.skjermingskode.ingen} as PersonHendelseData ];
    expect(hentEnhetensMotebehovHentet(motebehovSvar)).to.deep.equal({ type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET, data: motebehovSvar });
  });

  it('hentEnhetensMotebehovFeilet() skal returnere riktig action', () => {
    expect(hentEnhetensMotebehovFeilet()).to.deep.equal({ type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FEILET });
  });
});
