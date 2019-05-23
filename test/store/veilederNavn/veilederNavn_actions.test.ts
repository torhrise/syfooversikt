import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { NavIdent, VeilederNavnActionTypes } from '../../../src/store/veilederNavn/veilederNavnTypes';
import {
  hentVeilederNavnForespurt,
  hentVeilederNavnHenter,
  hentVeilederNavnHentet,
  hentVeilederNavnFeilet,
} from '../../../src/store/veilederNavn/veilederNavn_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('veilederNavn_actions', () => {
  const navIdent = {ident: 'Z999999'};
  it('hentVeilederNavnForespurt() skal returnere riktig action', () => {
    expect(hentVeilederNavnForespurt(navIdent))
      .to.deep.equal({ type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_FORESPURT, navident: navIdent });
  });

  it('hentVeilederNavnHenter() skal returnere riktig action', () => {
    expect(hentVeilederNavnHenter())
      .to.deep.equal({ type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTER });
  });

  it('hentVeilederNavnHentet() skal returnere riktig action', () => {
    const veilederNavnSvar = {
      id: navIdent.ident,
      navn: 'Katherine',
      fornavn: 'Dana',
      etternavn: 'Scully',
    };
    expect(hentVeilederNavnHentet(veilederNavnSvar))
      .to.deep.equal({ type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTET, data: veilederNavnSvar });
  });

  it('hentVeilederNavnFeilet() skal returnere riktig action', () => {
    expect(hentVeilederNavnFeilet())
      .to.deep.equal({ type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_FEILET });
  });
});
