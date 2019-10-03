import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import { Landingsside } from '../../src/sider/Landingsside';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../src/store';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Landingsside', () => {
  const component = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Landingsside />
      </MemoryRouter>
    </Provider>);

  it('Skal rendre Oversikt', () => {
    expect(component.find('OversiktContainer')).to.have.lengthOf(1);
  });
});
