import React from 'react';
import { Provider } from 'react-redux';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { before } from 'mocha';
import Personliste from '../../src/components/Personliste';
import Sorteringsrad from '../../src/components/Sorteringsrad';
import Personrad from '../../src/components/Personrad';
import {
  testdata,
  personregister,
  veiledere,
} from '../data/fellesTestdata';
import { store } from '../../src/store';
import { veiledereHentet } from '../../src/store/veiledere/veiledere_actions';
import { veilederEllerNull } from '../../src/utils/personDataUtil';

chai.use(chaiEnzyme());
const expect = chai.expect;

store.dispatch(veiledereHentet(veiledere));

describe('Personliste', () => {
  const markertePersoner = ['123', '234'];
  // tslint:disable-next-line:no-empty
  const checkboxHandler = () =>  {};
  const component = mount(<Provider store={store}>
    <Personliste
      personregister={personregister}
      checkboxHandler={checkboxHandler}
      markertePersoner={markertePersoner}
      veiledere={veiledere}
    />
  </Provider>);

  it('Skal rendre Sorteringsrad', () => {
    expect(component.find(Sorteringsrad)).to.have.length(1);
  });

  it('Skal rendre Personrad-komponenter med riktig persondata', () => {
    // tslint:disable-next-line: no-console
    expect(component.contains(<Personrad
      index={0}
      fnr={testdata.fnr1}
      veilederName={veilederEllerNull(veiledere[0])}
      personData={personregister[testdata.fnr1]}
      checkboxHandler={checkboxHandler}
      kryssAv={false}
    />)).to.equal(true);
    expect(component.contains(<Personrad
      index={1}
      veilederName={veilederEllerNull(veiledere[0])}
      fnr={testdata.fnr2}
      personData={personregister[testdata.fnr2]}
      checkboxHandler={checkboxHandler}
      kryssAv={false}
    />)).to.equal(true);
  });
});
