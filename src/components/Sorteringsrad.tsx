import { Checkbox } from 'nav-frontend-skjema';
import React from 'react';
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

const Sorteringsrad = () => {
  return (<Row className="sorteringsrad">
    <Column md={'3'}>
      <Checkbox label={tekster.velgalle} />
    </Column>
    <Column md={'3'}>{tekster.navn}</Column>
    <Column md={'3'}>{tekster.fodselsnummer}</Column>
    <Column md={'3'}>{tekster.diskresjonskode}</Column>
  </Row>);
};

export default Sorteringsrad;
