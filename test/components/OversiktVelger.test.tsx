import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import OversiktVelger from '../../src/components/OversiktVelger';
import { OVERSIKT_VISNING_TYPE } from '../../src/konstanter';
import OversiktContainer from '../../src/containers/OversiktContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OversiktVelger', () => {
  const component = shallow(<OversiktVelger />);
  const enhetensOversiktKnappTekst = 'Enhetens oversikt';

  it('"Enhetens oversikt"-knapp skal vaere aktiv', () => {
    const enhetensOversiktKnapp = component.find('.oversiktVelger__knapp--aktiv');
    expect(enhetensOversiktKnapp.text()).to.equal(enhetensOversiktKnappTekst);
  });

  it ('Skal rendre OversiktContainer med "ENHETENS OVERSIKT"-visningstype', () => {
    expect(component.contains(<OversiktContainer type={OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT} />)).to.equal(true);
  });

});
