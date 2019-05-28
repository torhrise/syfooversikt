import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import enhetNavnReducer from '../../../src/store/enhetNavn/enhetNavnReducer';
import {
  hentEnhetNavnHenter,
  hentEnhetNavnHentet,
  hentEnhetNavnFeilet,
} from '../../../src/store/enhetNavn/enhetNavn_actions';
import { EnhetNavn } from '../../../src/store/enhetNavn/enhetNavnTypes';

describe('enhetNavnReducer', () => {
  describe('Henter navn paa enheter', () => {
    const initialState = deepFreeze({
      hentet: false,
      henter: false,
      hentingFeilet: false,
      data: {} as EnhetNavn,
    });
    const enhetNavn = {
      enhetNr: '1234',
      navn: 'Nav Bjerke',
    };

    it('handterer HENT_ENHET_NAVN_HENTER', () => {
      const action = hentEnhetNavnHenter();
      const nesteState = enhetNavnReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: true,
        hentingFeilet: false,
        data: {},
      });
    });

    it('handterer HENT_ENHET_NAVN_HENTET', () => {
      const action = hentEnhetNavnHentet(enhetNavn);
      const nesteState = enhetNavnReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: true,
        henter: false,
        hentingFeilet: false,
        data: enhetNavn,
      });
    });

    it('handterer HENT_ENHET_NAVN_FEILET', () => {
      const action = hentEnhetNavnFeilet();
      const nesteState = enhetNavnReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: false,
        hentingFeilet: true,
        data: {} as EnhetNavn,
      });
    });
  });
});
