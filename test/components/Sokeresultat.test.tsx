import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import Sokeresultat from '../../src/components/Sokeresultat';
import * as testdata from '../../Mock/Data/fellesTestdata.json';
import Toolbar from '../../src/components/toolbar/Toolbar';
import Personliste from '../../src/components/Personliste';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Sokeresultat', () => {
  const personregister = {
    [testdata.fnr1]: { navn: testdata.navn1, harSvartPaaMotebehov: true, harMote: false,
      skjermingskode: testdata.skjermingskode.ingen, markert: false },
    [testdata.fnr2]: { navn: testdata.navn2, harSvartPaaMotebehov: false, harMote: false,
      skjermingskode: testdata.skjermingskode.egenAnsatt, markert: false },
  };
  // tslint:disable-next-line:no-empty
  const dummyFunksjon = () => {};

  const component = shallow(<Sokeresultat personregister={personregister} tildelVeileder={dummyFunksjon}/>);

  it('Skal inneholde knapperad', () => {
    expect(component.contains( <Toolbar buttonHandler={dummyFunksjon}/>));
  });
  it('Skal inneholde liste av personer', () => {
    expect(component.find(Personliste)).to.have.length(1);
  });

});
