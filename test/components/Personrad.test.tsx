import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import { Column } from 'nav-frontend-grid';
import Personrad from '../../src/components/Personrad';
import { lenkeTilModiaEnkeltperson } from '../../src/utils/lenkeUtil';
import { PersonData } from '../../src/store/personregister/personregisterTypes';

chai.use(chaiEnzyme());
const expect = chai.expect;

const skjermingskode = (person: PersonData) => {
  return person.skjermingskode !== 'INGEN'
    ? person.skjermingskode.toLowerCase().replace('_', ' ')
    : '';
};

describe('Personrad', () => {
  const fnr = '99999911111 ';
  const personData = { navn: 'Et navn', harSvartPaaMotebehov: false, skjermingskode: 'INGEN' };
  const component = shallow(<Personrad fnr={fnr} personData={personData} />);

  it('Skal rendre komponent med "personrad"-klasse', () => {
    expect(component.find('.personrad')).to.have.length(1);
  });

  it('Skal rendre Column-komponenter med riktig navn, fodselsnummer og skjermingskode', () => {
    expect(component.contains(<Column className="personrad__navn" md={'3'}>{personData.navn}</Column>)).to.equal(true);
    expect(component.contains(<Column className="personrad__fnr" md={'3'}>{lenkeTilModiaEnkeltperson(fnr)}</Column>)).to.equal(true);
    expect(component.contains(<Column className="personrad__skjermet" md={'3'}>{skjermingskode(personData)}</Column>)).to.equal(true);
  });
});
