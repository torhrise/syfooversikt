import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { EnhetensMoterActionTypes } from '../../../src/store/enhetensMoter/enhetensMoter_actions';
import {
  hentEnhetensMoterForespurt,
  hentEnhetensMoterHenter,
  hentEnhetensMoterHentet,
  hentEnhetensMoterFeilet,
} from '../../../src/store/enhetensMoter/enhetensMoter_actions';
import { testdata } from '../../data/fellesTestdata';
import { PersonHendelseData } from '../../../src/store/personregister/personregisterTypes';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('enhetensMoter_actions', () => {
  it('hentenhetensMoterForespurt() skal returnere riktig action', () => {
    expect(hentEnhetensMoterForespurt()).to.deep.equal({
      type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FORESPURT,
    });
  });

  it('hentenhetensMoterHenter() skal returnere riktig action', () => {
    expect(hentEnhetensMoterHenter()).to.deep.equal({
      type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTER,
    });
  });

  it('hentenhetensMoterHentet() skal returnere riktig action', () => {
    const moter = [ {
      fnr: testdata.fnr1,
      skjermingskode: testdata.skjermingskode.ingen,
    } as PersonHendelseData];
    expect(hentEnhetensMoterHentet(moter)).to.deep.equal(
      { type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTET, data: moter });
  });

  it('hentenhetensMoterFeilet() skal returnere riktig action', () => {
    expect(hentEnhetensMoterFeilet()).to.deep.equal({
      type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FEILET,
    });
  });
});
