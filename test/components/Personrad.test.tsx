import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import { Column } from 'nav-frontend-grid';
import Personrad from '../../src/components/Personrad';
import { lenkeTilModiaEnkeltperson } from '../../src/utils/lenkeUtil';
import { skjermingskode, veilederEllerUfordelt } from '../../src/utils/personDataUtil';
import {
  testdata,
  veiledere,
} from '../data/fellesTestdata';
import { PersonData } from '../../src/store/personregister/personregisterTypes';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Personrad', () => {
  const fnr = testdata.fnr1;
  const personData = { navn: testdata.navn1, harMotebehovUbehandlet: false, harMoteplanleggerUbehandlet: false,
    skjermingskode: testdata.skjermingskode.ingen, markert: false } as PersonData;
  // tslint:disable-next-line:no-empty
  const checkboxHandler = () => {};
  const component = shallow(<Personrad
    fnr={fnr}
    personData={personData}
    checkboxHandler={checkboxHandler}
    kryssAv={false}
    veileder={veiledere[0]}
  />);

  it('Skal inneholde komponent med "personrad"-klasse', () => {
    expect(component.find('.personrad')).to.have.length(1);
  });

  it('Skal rendre Column-komponenter med riktig navn, fodselsnummer og skjermingskode', () => {
    expect(component.contains(<Column className="personrad__navn" xs={'2'}>{lenkeTilModiaEnkeltperson(personData.navn, fnr)}</Column>)).to.equal(true);
    expect(component.contains(<Column className="personrad__fnr" xs={'2'}>{fnr}</Column>)).to.equal(true);
    expect(component.contains(<Column className="personrad__skjermet personliste__gutter-right" xs={'1'}>{skjermingskode(personData)}</Column>)).to.equal(true);
    expect(component.contains(<Column className="personrad__veileder" xs={'2'}>{personData.tildeltVeilederIdent}</Column>)).to.equal(true);
    expect(component.contains(<Column className="personrad__veiledernavn" xs={'2'}>{veilederEllerUfordelt(veiledere[0])}</Column>)).to.equal(true);
  });
});
