import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import Personliste from '../../src/components/Personliste';
import Sorteringsrad from '../../src/components/Sorteringsrad';
import Personrad from '../../src/components/Personrad';
import * as testdata from '../../Mock/Data/fellesTestdata.json';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Personliste', () => {
  const personregister = {
    [testdata.fnr1]: { navn: testdata.navn1, harSvartPaaMotebehov: true, skjermingskode: testdata.skjermingskode.ingen, markert: false },
    [testdata.fnr2]: { navn: testdata.navn2, harSvartPaaMotebehov: false, skjermingskode: testdata.skjermingskode.egenAnsatt, markert: false },
  };
  const fnrListe = [testdata.fnr1, testdata.fnr2];
  const markertePersoner = ['123', '234'];
  const checkAllHandler = () =>  { const kake = 3; };
  const checkboxHandler = () =>  { const kake = 3; };
  const component = shallow(<Personliste
    fnrListe={fnrListe}
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
