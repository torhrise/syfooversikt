import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import personNavnReducer from '../../../src/store/personNavn/personNavnReducer';
import {
  hentPersonNavnHenter,
  hentPersonNavnHentet,
  hentPersonNavnFeilet,
} from '../../../src/store/personNavn/personNavn_actions';
import { testdata } from '../../data/fellesTestdata';

describe('personNavnReducer', () => {
  describe('Henter navn paa personer', () => {
    const initialState = deepFreeze({
      hentet: false,
      henter: false,
      hentingFeilet: false,
      data: [],
    });

    it('handterer HENT_PERSON_NAVN_HENTER', () => {
      const action = hentPersonNavnHenter();
      const nesteState = personNavnReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: true,
        hentingFeilet: false,
        data: [],
      });
    });

    it('handterer HENT_PERSON_NAVN_HENTET', () => {
      const personNavnSvar = [{ fnr: testdata.fnr1, navn: testdata.navn1 }];
      const action = hentPersonNavnHentet(personNavnSvar);
      const nesteState = personNavnReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: true,
        henter: false,
        hentingFeilet: false,
        data: personNavnSvar,
      });
    });

    it('handterer HENT_PERSON_NAVN_FEILET', () => {
      const action = hentPersonNavnFeilet();
      const nesteState = personNavnReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: false,
        hentingFeilet: true,
        data: [],
      });
    });
  });
});
