import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import {
  Column,
  Row,
} from 'nav-frontend-grid';
import { store } from '../store';
import { toggleVelgAlle } from '../store/personregister/personregister_action';

const tekster = {
  velgalle: 'Velg alle',
  navn: 'Navn',
  fodselsnummer: 'Fødselsnummer',
  diskresjonskode: 'Diskresjonskode',
};

const Sorteringsrad = () => {
  return (<Row className="sorteringsrad">
    <Column md={'3'}>
      <Checkbox label={tekster.velgalle} onChange={(event) => store.dispatch(toggleVelgAlle(event.target.checked))} />
    </Column>
    <Column md={'3'}>{tekster.navn}</Column>
    <Column md={'3'}>{tekster.fodselsnummer}</Column>
    <Column md={'3'}>{tekster.diskresjonskode}</Column>
  </Row>);
};

export default Sorteringsrad;
