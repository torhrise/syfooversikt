import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
  PersonoversiktActionTypes,
  hentPersonoversiktForespurt,
  hentPersonoversiktHenter,
  hentPersonoversiktHentet,
  hentPersonoversiktFeilet,
} from '../../../src/store/personoversikt/personoversikt_actions';
import { personoversikt } from '../../data/fellesTestdata';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('personNavn_actions', () => {
  it('hentPersonoversiktForespurt() skal returnere riktig action', () => {
    expect(hentPersonoversiktForespurt()).to.deep.equal({
      type: PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_FORESPURT,
    });
  });

  it('hentPersonoversiktHenter() skal returnere riktig action', () => {
    expect(hentPersonoversiktHenter()).to.deep.equal({
      type: PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTER,
    });
  });

  it('hentPersonoversiktHentet() skal returnere riktig action', () => {
    const data = [...personoversikt];
    expect(hentPersonoversiktHentet(data)).to.deep.equal({
      type: PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTET,
      data,
    });
  });

  it('hentPersonoversiktFeilet() skal returnere riktig action', () => {
    expect(hentPersonoversiktFeilet()).to.deep.equal({
      type: PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_FEILET,
    });
  });
});
