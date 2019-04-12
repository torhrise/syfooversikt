import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { PersonNavnActionTypes } from '../../../src/store/personNavn/personNavnTypes';
import {
  hentPersonNavnForespurt,
  hentPersonNavnHenter,
  hentPersonNavnHentet,
  hentPersonNavnFeilet,
} from '../../../src/store/personNavn/personNavn_actions';
import * as testdata from '../../../Mock/Data/fellesTestdata.json';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('personNavn_actions', () => {
  it('hentPersonNavnForespurt() skal returnere riktig action', () => {
    const fnrListe = [{fnr: testdata.fnr1}];
    expect(hentPersonNavnForespurt(fnrListe)).to.deep.equal({ type: PersonNavnActionTypes.HENT_PERSON_NAVN_FORESPURT, data: fnrListe });
  });

  it('hentPersonNavnHenter() skal returnere riktig action', () => {
    expect(hentPersonNavnHenter()).to.deep.equal({ type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTER });
  });

  it('hentPersonNavnHentet() skal returnere riktig action', () => {
    const personNavnSvar = [ { fnr: testdata.fnr1, navn: testdata.navn1} ];
    expect(hentPersonNavnHentet(personNavnSvar)).to.deep.equal({ type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET, data: personNavnSvar });
  });

  it('hentPersonNavnFeilet() skal returnere riktig action', () => {
    expect(hentPersonNavnFeilet()).to.deep.equal({ type: PersonNavnActionTypes.HENT_PERSON_NAVN_FEILET });
  });
});
