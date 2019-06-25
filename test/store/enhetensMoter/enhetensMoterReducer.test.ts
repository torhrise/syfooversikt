import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import enhetensMoterReducer from '../../../src/store/enhetensMoter/enhetensMoterReducer';
import {
  EnhetensMoterActionTypes,
  hentEnhetensMoterHenter,
  hentEnhetensMoterHentet,
  hentEnhetensMoterFeilet,
} from '../../../src/store/enhetensMoter/enhetensMoter_actions';
import { testdata } from '../../data/fellesTestdata';
import { PersonHendelseData } from '../../../src/store/personregister/personregisterTypes';

describe('enhetensMoterReducer', () => {
  describe('Henter moter', () => {
    const initialState = deepFreeze({
      hentet: false,
      henter: false,
      hentingFeilet: false,
      data: [],
    });

    it(`handterer ${EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTER}`, () => {
      const action = hentEnhetensMoterHenter();
      const nesteState = enhetensMoterReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: true,
        hentingFeilet: false,
        data: [],
      });
    });

    it(`handterer ${EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTET}`, () => {
      const moter = [{ fnr: testdata.fnr1, skjermingskode: testdata.skjermingskode.ingen } as PersonHendelseData];
      const action = hentEnhetensMoterHentet(moter);
      const nesteState = enhetensMoterReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: true,
        henter: false,
        hentingFeilet: false,
        data: moter,
      });
    });

    it(`handterer ${EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FEILET}`, () => {
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
