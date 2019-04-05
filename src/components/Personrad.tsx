import { Checkbox } from 'nav-frontend-skjema';
import { lenkeTilModiaEnkeltperson } from '../utils/lenkeUtil';
import React from 'react';
import { Person } from '../store/personregister/personregisterTypes';
import { Column, Row } from 'nav-frontend-grid';

interface PersonradProps {
  fnr: string;
  personData: Person;
}

const skjermingskode = (person: Person) => {
  return person.skjermingskode !== 'INGEN'
    ? person.skjermingskode.toLowerCase().replace('_', ' ')
    : '';
};

const Personrad = (props: PersonradProps) => {
  const { fnr, personData } = props;
  return (<Row className="personrad">
    <Column className="personrad__checkbox" md={'3'}>
      <Checkbox label={'Marker'} />
    </Column>
    <Column className="personrad__navn" md={'3'}>{personData.navn}</Column>
    <Column className="personrad__fnr" md={'3'}>{lenkeTilModiaEnkeltperson(fnr)}</Column>
    <Column className="personrad__skjermet" md={'3'}>{skjermingskode(personData)}</Column>
  </Row>);
};

export default Personrad;
