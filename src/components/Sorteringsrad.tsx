import React from 'react';
import styled from 'styled-components';
import {
  Column,
  Row,
} from 'nav-frontend-grid';
import themes from '../styles/themes';

const tekster = {
  navn: 'Etternavn, Fornavn',
  fodselsnummer: 'Fødselsnummer',
  ident: 'NAV-ident',
  veileder: 'Veileder',
  overskriftBruker: 'Bruker',
  overskriftVeileder: 'Veileder',
};

export const OverskriftRad = styled(Row)`
  display: flex;
  align-items: center;
  padding: .5rem 0;
  border-top: 1px solid ${themes.color.navGra40};
  border-bottom: 1px solid ${themes.color.navGra40};
  font-weight: 700;
`;

const IngressRad = styled(Row)`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${themes.color.navGra40};
`;

const Sorteringsrad = () => {
  return (
    <>
      <OverskriftRad className="">
        <Column xs={'1'}/>
        <Column xs={'5'}>{tekster.overskriftBruker}</Column>
        <Column xs={'4'}>{tekster.overskriftVeileder}</Column>
      </OverskriftRad>

      <IngressRad className="">
        <Column className="emptyColumn" xs={'1'} />
        <Column xs={'3'}>{tekster.navn}</Column>
        <Column xs={'2'}>{tekster.fodselsnummer}</Column>
        <Column xs={'2'}>{tekster.ident}</Column>
        <Column xs={'2'}>{tekster.veileder}</Column>
      </IngressRad>
    </>
  );
};

export default Sorteringsrad;
