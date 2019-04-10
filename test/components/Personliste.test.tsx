import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import Personliste from '../../src/components/Personliste';
import Sorteringsrad from '../../src/components/Sorteringsrad';
import Personrad from '../../src/components/Personrad';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Personliste', () => {
  const fnr1 = '99999911111';
  const fnr2 = '99999922222';
  const personregister = {
    [fnr1]: { navn: 'Et navn', harSvartPaaMotebehov: true, skjermingskode: 'INGEN' },
    [fnr2]: { navn: 'Et annet navn', harSvartPaaMotebehov: false, skjermingskode: 'EGEN_ANSATT' },
  };
  const fnrListe = ['99999911111', '99999922222'];
  const component = shallow(<Personliste fnrListe={fnrListe} personregister={personregister} />);

  it('Skal rendre Sorteringsrad', () => {
    expect(component.contains(<Sorteringsrad/>)).to.equal(true);
  });

  it('Skal rendre Personrad-komponenter med riktig persondata', () => {
    expect(component.contains(<Personrad fnr={fnr1} personData={personregister[fnr1]} />)).to.equal(true);
    expect(component.contains(<Personrad fnr={fnr2} personData={personregister[fnr2]} />)).to.equal(true);
  });
});
