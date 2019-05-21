import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import veilederenheterReducer from '../../../src/store/veilederenheter/veilederenheterReducer';
import {
  hentVeilederenheterHenter,
  hentVeilederenheterHentet,
  hentVeilederenheterFeilet,
} from '../../../src/store/veilederenheter/veilederenheter_actions';
import { enhet } from '../../data/fellesTestdata';

describe('veilederenheterReducer', () => {
  describe('Henter moter', () => {
    const initData = { enhetliste: [] };
    const initialState = deepFreeze({
      hentet: false,
      henter: false,
      hentingFeilet: false,
      data: initData,
    });

    it('handterer HENT_VEILEDERENHETER_HENTER', () => {
      const action = hentVeilederenheterHenter();
      const nesteState = veilederenheterReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: true,
        hentingFeilet: false,
        data: initData,
      });
    });

    it('handterer HENT_VEILEDERENHETER_HENTET', () => {
      const data =  {
        enhetliste: [
          enhet
        ],
      };
      const action = hentVeilederenheterHentet(data);
      const nesteState = veilederenheterReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: true,
        henter: false,
        hentingFeilet: false,
        data,
      });
    });

    it('handterer HENT_VEILEDERENHETER_FEILET', () => {
      const action = hentVeilederenheterFeilet();
      const nesteState = veilederenheterReducer(initialState, action);
      expect(nesteState).to.deep.equal({
        hentet: false,
        henter: false,
        hentingFeilet: true,
        data: initData,
      });
    });
  });
});
