import { expect } from 'chai';
import { hentVeilederNavnHentet } from '../../../src/store/veilederNavn/veilederNavn_actions';
import veilederNavnReducer from '../../../src/store/veilederNavn/veilederNavnReducer';
import { VeilederNavnState } from '../../../src/store/veilederNavn/veilederNavnTypes';

describe('veiledernavnReducer', () => {
  describe('Hent veiledernavn', () => {
    const initialState = Object.freeze({ } as VeilederNavnState);

    const veilederNavn1 = {
      id: 'Z999999',
      fornavn: 'Dana',
      navn: 'Katherine',
      etternavn: 'Scully',
    };

    const veilederNavn2 = {
      id: 'Z888888',
      fornavn: 'Fox',
      navn: 'William',
      etternavn: 'Mulder',
    };

    it('lagre personNavn ved HENT_VEILEDER_NAVN_HENTET', () => {
      const forsteAction = hentVeilederNavnHentet(veilederNavn1);
      const andreAction = hentVeilederNavnHentet(veilederNavn2);
      const forsteState = veilederNavnReducer(initialState, forsteAction);
      expect(forsteState).to.deep.equal({
        henter: false,
        hentet: true,
        data: {[veilederNavn1.id]: veilederNavn1 },
      });

      const andreState = veilederNavnReducer(forsteState, andreAction);
      expect(andreState).to.deep.equal({
        henter: false,
        hentet: true,
        data: {
          [veilederNavn1.id]: veilederNavn1,
          [veilederNavn2.id]: veilederNavn2},
      });

    });

  });
});
