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
  typer: 'Hendelsestyper'
};

const Sorteringsrad = () => {
  return (<Row className="sorteringsrad">
    <Column md={'2'}>
      <Checkbox label={tekster.velgalle} onChange={(event) => store.dispatch(toggleVelgAlle(event.target.checked))} />
    </Column>
    <Column md={'2'}>{tekster.navn}</Column>
    <Column md={'2'}>{tekster.fodselsnummer}</Column>
    <Column md={'2'}>{tekster.diskresjonskode}</Column>
    <Column md={'2'}>{tekster.typer}</Column>
  </Row>);
};

export default Sorteringsrad;
