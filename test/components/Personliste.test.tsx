import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import Personliste from '../../src/components/Personliste';
import Sorteringsrad from '../../src/components/Sorteringsrad';
import Personrad from '../../src/components/Personrad';
import { testdata, personregister } from '../data/fellesTestdata';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Personliste', () => {
  const markertePersoner = ['123', '234'];
  // tslint:disable-next-line:no-empty
  const checkAllHandler = () =>  {};
  // tslint:disable-next-line:no-empty
  const checkboxHandler = () =>  {};
  const component = shallow(<Personliste
    personregister={personregister}
    checkboxHandler={checkboxHandler}
    markertePersoner={markertePersoner}
    checkAllHandler={checkAllHandler}
  />);

  it('Skal rendre Sorteringsrad', () => {
    expect(component.contains(<Sorteringsrad checkAllHandler={checkAllHandler}/>)).to.equal(true);
  });

  it('Skal rendre Personrad-komponenter med riktig persondata', () => {
    expect(component.contains(<Personrad
      fnr={testdata.fnr1}
      personData={personregister[testdata.fnr1]}
      checkboxHandler={checkboxHandler}
      kryssAv={false}
    />)).to.equal(true);
    expect(component.contains(<Personrad
      fnr={testdata.fnr2}
      personData={personregister[testdata.fnr2]}
      checkboxHandler={checkboxHandler}
      kryssAv={false}
    />)).to.equal(true);
  });
});
