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
  const kolonneForFnrTekst = 'Fødselsnummer';
  const kolonneForIdent= 'NAV-ident';
  const kolonneForVeilederTekst = 'Veileder';
  // tslint:disable-next-line:no-empty
  const component = shallow(<Sorteringsrad onSortClick={(type) => {}}/>);

  it('Skal inneholde OverskriftRad', () => {
    expect(component.find(OverskriftRad)).to.have.length(1);
  });

  it('Skal rendre navn, fodselsnummer, veilederident og veiledernavn Column-komponenter', () => {
    expect(component.find(SortingButton)).to.have.length(1);
    expect(component.contains(<Column xs={'2'}>{kolonneForFnrTekst}</Column>)).to.equal(true);
    expect(component.contains(<Column xs={'2'}>{kolonneForIdent}</Column>)).to.equal(true);
    expect(component.contains(<Column xs={'2'}>{kolonneForVeilederTekst}</Column>)).to.equal(true);
  });
});
