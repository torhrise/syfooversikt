import { expect } from 'chai';
import { hentEnhetensMotebehovHentet } from '../../../src/store/enhetensMotebehov/enhetensMotebehov_actions';
import { hentPersonNavnHentet } from '../../../src/store/personNavn/personNavn_actions';
import personregisterReducer from '../../../src/store/personregister/personregisterReducer';
import { testdata } from '../../data/fellesTestdata';
import { PersonHendelseData } from '../../../src/store/personregister/personregisterTypes';

describe('personregisterReducer', () => {
  describe('Henter persondata', () => {
    const initialState = Object.freeze({ });

    it('handterer HENT_ENHETENS_MOTEBEHOV_HENTET', () => {
      const dataIForsteKall = [
        {
          fnr: testdata.fnr1,
          skjermingskode: testdata.skjermingskode.ingen,
        } as PersonHendelseData,
        {
          fnr: testdata.fnr2,
          skjermingskode: testdata.skjermingskode.diskresjonsmerket,
        }  as PersonHendelseData];
      const dataIAndreKall = [ {
        fnr: testdata.fnr3,
        skjermingskode: testdata.skjermingskode.egenAnsatt,
      }  as PersonHendelseData ];
      const forsteAction = hentEnhetensMotebehovHentet(dataIForsteKall);
      const andreAction = hentEnhetensMotebehovHentet(dataIAndreKall);
      const forsteState = personregisterReducer(initialState, forsteAction);
      expect(forsteState).to.deep.equal({
        [testdata.fnr1]: {
          skjermingskode: testdata.skjermingskode.ingen,
        },
        [testdata.fnr2]: {
          skjermingskode: testdata.skjermingskode.diskresjonsmerket,
        },
      });
      const andreState = personregisterReducer(forsteState, andreAction);
      expect(andreState).to.deep.equal({
        [testdata.fnr1]: {
          skjermingskode: testdata.skjermingskode.ingen,
        },
        [testdata.fnr2]: {
          skjermingskode: testdata.skjermingskode.diskresjonsmerket,
        },
        [testdata.fnr3]: {
          skjermingskode: testdata.skjermingskode.egenAnsatt,
        },
      });
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
      const dataIForsteKall = [
        {
          fnr: testdata.fnr1,
          skjermingskode: testdata.skjermingskode.ingen,
        } as PersonHendelseData,
        {
          fnr: testdata.fnr2,
          skjermingskode: testdata.skjermingskode.diskresjonsmerket,
        } as PersonHendelseData,
        {
          fnr: testdata.fnr3,
          skjermingskode: testdata.skjermingskode.egenAnsatt,
        } as PersonHendelseData];
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
          fnr: testdata.fnr3,
          navn: testdata.navn3,
        } ];
      const hentMotebehovAction = hentEnhetensMotebehovHentet(dataIForsteKall);
      const hentPersonNavnAction = hentPersonNavnHentet(dataIAndreKall);
      const forsteState = personregisterReducer(initialState, hentMotebehovAction);
      expect(forsteState).to.deep.equal({
        [testdata.fnr1]: {
          skjermingskode: testdata.skjermingskode.ingen,
        },
        [testdata.fnr2]: {
          skjermingskode: testdata.skjermingskode.diskresjonsmerket,
        },
        [testdata.fnr3]: {
          skjermingskode: testdata.skjermingskode.egenAnsatt,
        },
      });
      const andreState = personregisterReducer(forsteState, hentPersonNavnAction);
      expect(andreState).to.deep.equal({
        [testdata.fnr1]: {
          navn: testdata.navn1,
          skjermingskode: testdata.skjermingskode.ingen,
        },
        [testdata.fnr2]: {
          navn: testdata.navn2,
          skjermingskode: testdata.skjermingskode.diskresjonsmerket,
        },
        [testdata.fnr3]: {
          navn: testdata.navn3,
          skjermingskode: testdata.skjermingskode.egenAnsatt,
        },
      });
    });
  });
});
