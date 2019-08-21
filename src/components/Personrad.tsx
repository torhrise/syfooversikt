import React, { Component } from 'react';
import {
  Column,
  Row,
} from 'nav-frontend-grid';
import { Checkbox } from 'nav-frontend-skjema';
import { lenkeTilModiaEnkeltperson } from '../utils/lenkeUtil';
import { PersonData } from '../store/personregister/personregisterTypes';
import {
  hendelsestype,
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
      <Row className="personrad personliste__element personliste--border-bottom-thin">
        <Column className="personrad__checkbox personliste__gutter-left personliste--min-width-enhet" xs={'1'}>
          <Checkbox label={''} checked={!!kryssAv} onChange={(event) => {
            checkboxHandler(fnr);
          }}/>
        </Column>
        <div className="personliste__innhold flex flex--center">
          <Column className="personrad__navn" xs={'2'}>{lenkeTilModiaEnkeltperson(personData.navn, fnr)}</Column>
          <Column className="personrad__fnr" xs={'2'}>{fnr}</Column>
          <Column className="personrad__veileder" xs={'2'}>{personData.tildeltVeilederIdent}</Column>
          <Column className="personrad__veiledernavn" xs={'2'}>{veilederEllerUfordelt(veileder)}</Column>
        </div>
        <Column className="personrad__skjermet personliste__gutter-right" xs={'1'}>{skjermingskode(personData)}</Column>
      </Row>);
  }
}

export default Personrad;
