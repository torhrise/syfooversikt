import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import enhetensMoterReducer from '../../../src/store/enhetensMoter/enhetensMoterReducer';
import {
  hentEnhetensMoterHenter,
  hentEnhetensMoterHentet,
  hentEnhetensMoterFeilet,
} from '../../../src/store/enhetensMoter/enhetensMoter_actions';
import * as testdata from '../../../Mock/Data/fellesTestdata.json';

describe('enhetensMoterReducer', () => {
  describe('Henter moter', () => {
    const initialState = deepFreeze({
      hentet: false,
      henter: false,
      hentingFeilet: false,
      data: [],
    });

    it('handterer HENT_ENHETENS_MOTER_HENTER', () => {
      const action = hentEnhetensMoterHenter();
      const nesteState = enhetensMoterReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: true,
        hentingFeilet: false,
        data: [],
      });
    });

    it('handterer HENT_ENHETENS_MOTER_HENTET', () => {
      const moter = [{ fnr: testdata.fnr1, skjermingskode: testdata.skjermingskode.ingen }];
      const action = hentEnhetensMoterHentet(moter);
      const nesteState = enhetensMoterReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: true,
        henter: false,
        hentingFeilet: false,
        data: moter,
      });
    });

    it('handterer HENT_ENHETENS_MOTER_FEILET', () => {
      const action = hentEnhetensMoterFeilet();
      const nesteState = enhetensMoterReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: false,
        hentingFeilet: true,
        data: [],
      });
    });
  });
});
