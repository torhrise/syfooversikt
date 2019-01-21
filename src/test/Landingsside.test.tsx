import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import LandingssideHeader from '../components/LandingssideHeader';
import { Landingsside } from '../sider/Landingsside';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Landingsside', () => {
  const component = shallow(<Landingsside />);
  it('Skal rendre LandingssideHeader', () => {
    expect(
      component.contains(
        <LandingssideHeader bilde={'/syfooversikt/src/img/veileder.svg'} />
      )
    ).to.equal(true);
  });
});
