import React, { Component } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { Checkbox } from 'nav-frontend-skjema';
import { lenkeTilModiaEnkeltperson } from '../utils/lenkeUtil';
import { PersonData } from '../store/personregister/personregisterTypes';
import { skjermingskode } from '../utils/personDataUtil';

interface PersonradProps {
  fnr: string;
  personData: PersonData;
  checkboxHandler: (fnr: string) => void;
  kryssAv: boolean;
}

class Personrad extends Component<PersonradProps> {
  constructor(props: PersonradProps) {
    super(props);
  }

  render() {
    const {
      fnr,
      checkboxHandler,
      personData,
      kryssAv,
    } = this.props;
    return (
      <Row className="personrad">
      <Column className="personrad__checkbox" md={'3'}>
        <Checkbox label={'Marker'} checked={!!kryssAv} onChange={(event) => {checkboxHandler(fnr);}}/>
      </Column>
      <Column className="personrad__navn" md={'3'}>{this.props.personData.navn}</Column>
      <Column className="personrad__fnr" md={'3'}>{lenkeTilModiaEnkeltperson(fnr)}</Column>
      <Column className="personrad__skjermet" md={'3'}>{skjermingskode(personData)}</Column>
    </Row>);
  }
}

export default Personrad;
