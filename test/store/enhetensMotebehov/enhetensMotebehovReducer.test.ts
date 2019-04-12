import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import enhetensMotebehovReducer from '../../../src/store/enhetensMotebehov/enhetensMotebehovReducer';
import {
  hentEnhetensMotebehovHenter,
  hentEnhetensMotebehovHentet,
  hentEnhetensMotebehovFeilet,
} from '../../../src/store/enhetensMotebehov/enhetensMotebehov_actions';
import * as testdata from '../../../Mock/Data/fellesTestdata.json';

describe('enhetensMotebehovReducer', () => {
  describe('Henter motebehovsvar', () => {
    const initialState = deepFreeze({
      hentet: false,
      henter: false,
      hentingFeilet: false,
      data: [],
    });

    it('handterer HENT_ENHETENS_MOTEBEHOV_HENTER', () => {
      const action = hentEnhetensMotebehovHenter();
      const nesteState = enhetensMotebehovReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: true,
        hentingFeilet: false,
        data: [],
      });
    });

    it('handterer HENT_ENHETENS_MOTEBEHOV_HENTET', () => {
      const motebehovSvar = [{ fnr: testdata.fnr1, skjermingskode: testdata.skjermingskode.ingen }];
      const action = hentEnhetensMotebehovHentet(motebehovSvar);
      const nesteState = enhetensMotebehovReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: true,
        henter: false,
        hentingFeilet: false,
        data: motebehovSvar,
      });
    });

    it('handterer HENT_ENHETENS_MOTEBEHOV_FEILET', () => {
      const action = hentEnhetensMotebehovFeilet()
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
