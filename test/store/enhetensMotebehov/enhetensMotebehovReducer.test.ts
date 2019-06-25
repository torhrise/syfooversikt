import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import enhetensMotebehovReducer from '../../../src/store/enhetensMotebehov/enhetensMotebehovReducer';
import {
  EnhetensMotebehovActionTypes,
  hentEnhetensMotebehovHenter,
  hentEnhetensMotebehovHentet,
  hentEnhetensMotebehovFeilet,
} from '../../../src/store/enhetensMotebehov/enhetensMotebehov_actions';
import { testdata } from '../../data/fellesTestdata';
import { PersonHendelseData } from '../../../src/store/personregister/personregisterTypes';

describe('enhetensMotebehovReducer', () => {
  describe('Henter motebehovsvar', () => {
    const initialState = deepFreeze({
      hentet: false,
      henter: false,
      hentingFeilet: false,
      data: [],
    });

    it(`handterer ${EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER}`, () => {
      const action = hentEnhetensMotebehovHenter();
      const nesteState = enhetensMotebehovReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: true,
        hentingFeilet: false,
        data: [],
      });
    });

    it(`handterer ${EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET}`, () => {
      const motebehovSvar = [{ fnr: testdata.fnr1, skjermingskode: testdata.skjermingskode.ingen } as PersonHendelseData];
      const action = hentEnhetensMotebehovHentet(motebehovSvar);
      const nesteState = enhetensMotebehovReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: true,
        henter: false,
        hentingFeilet: false,
        data: motebehovSvar,
      });
    });

    it(`handterer ${EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FEILET}`, () => {
      const action = hentEnhetensMotebehovFeilet();
      const nesteState = enhetensMotebehovReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: false,
        hentingFeilet: true,
        data: [],
      });
    });
  });
});
