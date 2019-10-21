import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Column } from 'nav-frontend-grid';
import Sorteringsrad, { OverskriftRad, SortingButton } from '../../src/components/Sorteringsrad';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Sorteringsrad', () => {
  const kolonneForNavnTekst = 'Etternavn, Fornavn';
  const kolonneVirksomhetTekst = 'Virksomhet';
  const kolonneForFnrTekst = 'Fødselsnummer';
  const kolonneForVeilederTekst = 'Veileder';
  const component = shallow(<Sorteringsrad onSortClick={(type) => {}}/>);

  it('Skal rendre navn, fodselsnummer, veilederident og veiledernavn Column-komponenter', () => {
    // TODO: må finne en annen måte å teste når kolonner inneholder nested styled components
    expect(component.find(SortingButton)).to.have.length(2);
    expect(component.contains(<Column xs={'2'}>{kolonneVirksomhetTekst}</Column>)).to.equal(true);
    expect(component.contains(<Column xs={'2'}>{kolonneForVeilederTekst}</Column>)).to.equal(true);
  });
});
