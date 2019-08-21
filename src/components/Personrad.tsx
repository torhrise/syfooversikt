import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Column,
  Row,
} from 'nav-frontend-grid';
import { Checkbox } from 'nav-frontend-skjema';
import themes from '../styles/themes';
import { lenkeTilModiaEnkeltperson } from '../utils/lenkeUtil';
import { PersonData } from '../store/personregister/personregisterTypes';
import {
  skjermingskode,
  veilederEllerUfordelt,
} from '../utils/personDataUtil';
import { Veileder } from '../store/veiledere/veiledereTypes';

interface PersonradProps {
  fnr: string;
  personData: PersonData;
  checkboxHandler: (fnr: string) => void;
  kryssAv: boolean;
  veileder?: Veileder;
}

export const PersonRad = styled(Row)`
  display: flex;
  align-items: center;
  padding: .3rem 0;
  border-bottom: 1px solid ${themes.color.navGra40};
`;

const VelgBoks = styled(Checkbox)`
  padding-bottom: 1em;
`;

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
      veileder,
    } = this.props;
    return (
      <PersonRad className="">
        <Column xs={'1'}>
          <VelgBoks
              label={''}
              checked={!!kryssAv}
              onChange={(event) => {
                checkboxHandler(fnr);
              }}
          />
        </Column>
        <Column className="personrad__navn" xs={'3'}>{lenkeTilModiaEnkeltperson(personData.navn, fnr)}</Column>
        <Column className="personrad__fnr" xs={'2'}>{fnr}</Column>
        <Column className="personrad__veileder" xs={'2'}>{personData.tildeltVeilederIdent}</Column>
        <Column className="personrad__veiledernavn" xs={'2'}>{veilederEllerUfordelt(veileder)}</Column>
        <Column className="personrad__skjermet" xs={'2'}>{skjermingskode(personData)}</Column>
      </PersonRad>);
  }
}

export default Personrad;
