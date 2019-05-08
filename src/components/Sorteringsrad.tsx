import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import {
  Column,
  Row,
} from 'nav-frontend-grid';

const tekster = {
  velgalle: 'Velg alle',
  navn: 'Navn',
  fodselsnummer: 'Fødselsnummer',
  diskresjonskode: 'Diskresjonskode',
};

interface SorteringsradProps {
  checkAllHandler: (checked: boolean) => void;
}

const Sorteringsrad = (props: SorteringsradProps) => {
  return (<Row className="sorteringsrad">
    <Column md={'3'}>
      <Checkbox label={tekster.velgalle} onChange={(event) => {props.checkAllHandler(event.target.checked);}} />
    </Column>
    <Column md={'3'}>{tekster.navn}</Column>
    <Column md={'3'}>{tekster.fodselsnummer}</Column>
    <Column md={'3'}>{tekster.diskresjonskode}</Column>
  </Row>);
};

export default Sorteringsrad;
