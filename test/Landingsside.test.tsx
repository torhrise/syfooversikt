import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import LandingssideHeader from '../src/components/LandingssideHeader';
import { Landingsside } from '../src/sider/Landingsside';
import OversiktVelger from '../src/components/OversiktVelger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Landingsside skal rendre LandingssideHeader og OversiktVelger', () => {
  const component = shallow(<Landingsside />);
  it('Skal rendre LandingssideHeader', () => {
    expect(
      component.contains(
        <LandingssideHeader bilde={'/syfooversikt/src/img/veileder.svg'} />
      )
    ).to.equal(true);
  });

  it('Skal rendre Oversikt', () => {
    expect(
      component.contains(
        <OversiktVelger />
      )
    ).to.equal(true);
  });
});
