import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { EnhetNavnActionTypes } from '../../../src/store/enhetNavn/enhetNavnTypes';
import {
  hentEnhetNavnForespurt,
  hentEnhetNavnHenter,
  hentEnhetNavnHentet,
  hentEnhetNavnFeilet,
} from '../../../src/store/enhetNavn/enhetNavn_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('enhetNavn_actions', () => {
  it('hentEnhetNavnForespurt() skal returnere riktig action', () => {
    const enhetNr = {enhetNr: '1234'};
    expect(hentEnhetNavnForespurt({enhetNr: '1234'}))
      .to.deep.equal({ type: EnhetNavnActionTypes.HENT_ENHET_NAVN_FORESPURT, data: enhetNr });
  });

  it('hentEnhetNavnHenter() skal returnere riktig action', () => {
    expect(hentEnhetNavnHenter())
      .to.deep.equal({ type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTER });
  });

  it('hentEnhetNavnHentet() skal returnere riktig action', () => {
    const enhetNavnSvar = { enhetNr: '1234', navn: 'Nav Kråkerøy' };
    expect(hentEnhetNavnHentet(enhetNavnSvar))
      .to.deep.equal({ type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTET, data: enhetNavnSvar });
  });

  it('hentEnhetNavnFeilet() skal returnere riktig action', () => {
    expect(hentEnhetNavnFeilet())
      .to.deep.equal({ type: EnhetNavnActionTypes.HENT_ENHET_NAVN_FEILET });
  });
});
