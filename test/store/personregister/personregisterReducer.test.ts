import { expect } from 'chai';
import { hentPersonNavnHentet } from '../../../src/store/personNavn/personNavn_actions';
import personregisterReducer from '../../../src/store/personregister/personregisterReducer';
import {
  personoversikt,
  testdata,
} from '../../data/fellesTestdata';
import {
  hentPersonoversiktHentet,
  PersonoversiktActionTypes
} from '../../../src/store/personoversikt/personoversikt_actions';
import { PersonoversiktStatus } from '../../../src/store/personoversikt/personoversiktTypes';

const mapPersonToState = (person: PersonoversiktStatus) => {
  return {
    tildeltEnhetId: person.enhet,
    tildeltVeilederIdent: person.veilederIdent,
    harMotebehovUbehandlet: person.motebehovUbehandlet,
  };
};
const mapPersonerToState = (liste: PersonoversiktStatus[]) => {
  let state = {};
  liste.forEach((person) => {
    state = {
      ...state,
      [person.fnr]: mapPersonToState(person),
    };
  });
  return state;
};

describe('personregisterReducer', () => {
  describe('Henter persondata', () => {
    const initialState = Object.freeze({ });

    it(`handterer ${PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTET}`, () => {
      const forsteAction = hentPersonoversiktHentet(personoversikt);
      const forsteState = personregisterReducer(initialState, forsteAction);
      expect(forsteState).to.deep.equal(mapPersonerToState(personoversikt));
    });

    it('handterer HENT_PERSON_NAVN_HENTET', () => {
      const dataIForsteKall = [ {
        fnr: testdata.fnr1,
        navn: testdata.navn1,
      }, {
        fnr: testdata.fnr2,
        navn: testdata.navn2,
      } ];
      const dataIAndreKall = [ {
        fnr: testdata.fnr3,
        navn: testdata.navn3,
      } ];
      const forsteAction = hentPersonNavnHentet(dataIForsteKall);
      const andreAction = hentPersonNavnHentet(dataIAndreKall);
      const forsteState = personregisterReducer(initialState, forsteAction);
      expect(forsteState).to.deep.equal({
        [testdata.fnr1]: { navn: testdata.navn1 },
        [testdata.fnr2]: { navn: testdata.navn2 },
      });
      const andreState = personregisterReducer(forsteState, andreAction);
      expect(andreState).to.deep.equal({
        [testdata.fnr1]: { navn: testdata.navn1 },
        [testdata.fnr2]: { navn: testdata.navn2 },
        [testdata.fnr3]: { navn: testdata.navn3 },
      });
    });

    it('handterer kombinasjoner', () => {
      const personoversiktAction = hentPersonoversiktHentet(personoversikt);
      const forsteState = personregisterReducer(initialState, personoversiktAction);
      const expForsteState = mapPersonerToState(personoversikt);
      expect(forsteState).to.deep.equal(expForsteState);

      const dataIAndreKall = [
        {
          fnr: testdata.fnr1,
          navn: testdata.navn1,
        },
        {
          fnr: testdata.fnr2,
          navn: testdata.navn2,
        },
        {
          fnr: testdata.fnr4,
          navn: testdata.navn3,
        } ];
      const hentPersonNavnAction = hentPersonNavnHentet(dataIAndreKall);

      const andreState = personregisterReducer(forsteState, hentPersonNavnAction);
      const expAndreState = {
        ...forsteState,
        [testdata.fnr1]: {
          ...forsteState[testdata.fnr1],
          navn: testdata.navn1,
        },
        [testdata.fnr2]: {
          navn: testdata.navn2,
        },
        [testdata.fnr4]: {
          ...forsteState[testdata.fnr4],
          navn: testdata.navn3,
        },
      };
      expect(andreState).to.deep.equal(expAndreState);
    });
  });
});
