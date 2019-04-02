import { Checkbox } from 'nav-frontend-skjema';
import { lenkeTilModiaEnkeltperson } from '../utils/lenkeUtil';
import React from 'react';
import { MotebehovSvar } from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import { Column, Row } from 'nav-frontend-grid';

export interface Person {
  navn: string;
  svar: MotebehovSvar;
}

interface PersonradProps {
  person: Person;
}

const Personrad = (props: PersonradProps) => {
  const { person } = props;
  return (<Row className="personrad">
    <Column className="personrad__checkbox" md={'3'}>
      <Checkbox label={'Marker'} />
    </Column>
    <Column className="personrad__navn" md={'3'}>{person.navn}</Column>
    <Column className="personrad__fnr" md={'3'}>{lenkeTilModiaEnkeltperson(person.svar.fnr)}</Column>
    <Column className="personrad__skjermet" md={'3'}>{person.svar.skjermingskode !== 'INGEN' ? '(SKJERMET)' : ''}</Column>
  </Row>);
};

export default Personrad;
