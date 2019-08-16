import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import {
  Column,
  Row,
} from 'nav-frontend-grid';

const tekster = {
  pakrevdLabelTom: '',
  navn: 'Etternavn, Fornavn',
  fodselsnummer: 'Fødselsnummer',
  ident: 'NAV-ident',
  veileder: 'Veileder',
  overskriftBruker: 'Bruker',
  overskriftVeileder: 'Veileder',
};

interface SorteringsradProps {
  checked: boolean;
  checkAllHandler: (checked: boolean) => void;
}

const Sorteringsrad = (props: SorteringsradProps) => {
  return (
    <>
      <Row className=" personliste__overskriftheader personliste--borders">
        <Column xs={'1'} className="personliste__gutter-left personliste--min-width-enhet"/>
        <div className="personliste__innhold">
          <Column xs={'4'}>{tekster.overskriftBruker}</Column>
          <Column xs={'4'}>{tekster.overskriftVeileder}</Column>
        </div>
        <Column xs={'1'} className="personliste__gutter-right"/>
      </Row>
      <Row className="personliste__sorteringheader personliste--border-bottom">
        <Column xs={'1'} className="personliste__gutter-left personliste--min-width-enhet">
          <Checkbox className="skjemaelement--overskrift" label={tekster.pakrevdLabelTom} checked={props.checked} onChange={(event) => {
            props.checkAllHandler(event.target.checked);
          }}/>
        </Column>
        <div className="personliste__innhold">
          <Column xs={'2'}>{tekster.navn}</Column>
          <Column xs={'2'}>{tekster.fodselsnummer}</Column>
          <Column xs={'2'}>{tekster.ident} </Column>
          <Column xs={'2'}>{tekster.veileder}</Column>
        </div>
        <Column xs={'1'} className="personliste__gutter-right"/>
      </Row>
    </>
  );
};

export default Sorteringsrad;
