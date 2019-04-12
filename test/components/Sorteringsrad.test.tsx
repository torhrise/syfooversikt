import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import { Column } from 'nav-frontend-grid';
import Sorteringsrad from '../../src/components/Sorteringsrad';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Sorteringsrad', () => {
  const checkboxVelgAlleTekst = 'Velg alle';
  const kolonneForNavnTekst = 'Navn';
  const kolonneForFnrTekst = 'Fødselsnummer';
  const kolonneForDiskresjonskodeTekst = 'Diskresjonskode';
  const component = shallow(<Sorteringsrad />);

  it('Skal inneholde "Velg alle"-Checkbox', () => {
    expect(component.find({label: checkboxVelgAlleTekst})).to.have.length(1);
  });

  it('Skal inneholde komponent med "sorteringsrad"-klasse', () => {
    expect(component.find('.sorteringsrad')).to.have.length(1);
  });

  it('Skal rendre navn, fodselsnummer og skjermingskode Column-komponenter', () => {
    expect(component.contains(<Column md={'3'}>{kolonneForNavnTekst}</Column>)).to.equal(true);
    expect(component.contains(<Column md={'3'}>{kolonneForFnrTekst}</Column>)).to.equal(true);
    expect(component.contains(<Column md={'3'}>{kolonneForDiskresjonskodeTekst}</Column>)).to.equal(true);
  });
});
