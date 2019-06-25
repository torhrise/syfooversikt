import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import Sokeresultat from '../../src/components/Sokeresultat';
import {
  enhet,
  veilederinfo,
  personregister,
} from '../data/fellesTestdata';
import Toolbar from '../../src/components/toolbar/Toolbar';
import Personliste from '../../src/components/Personliste';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Sokeresultat', () => {
  // tslint:disable-next-line:no-empty
  const dummyFunksjon = () => {};

  const component = shallow(<Sokeresultat
      aktivEnhet={enhet}
      aktivVeilederinfo={veilederinfo}
      personregister={personregister}
      tildelVeileder={dummyFunksjon}
  />);

  it('Skal inneholde knapperad', () => {
    expect(component.contains( <Toolbar buttonHandler={dummyFunksjon} />));
  });
  it('Skal inneholde liste av personer', () => {
    expect(component.find(Personliste)).to.have.length(1);
  });
});
