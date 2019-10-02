import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Column,
  Row,
  RowProps,
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
  index: number;
}

export const PersonRad = styled.div.attrs(props => ())`
  display: flex;
  align-items: center;
  padding: .1em 0;
  margin-bottom: 0.1em;
  /* border-bottom: 1px solid ${themes.color.navGra40}; */

  background-color: ${(props) => props.index % 2 === 0 ? '#fff' : themes.color.navGra20 }};
  ${(props) => props.selected ? {backgroundColor: 'red'} : {} }
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
      index,
    } = this.props;
    return (
      <PersonRad index={index} selected={kryssAv}>
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
