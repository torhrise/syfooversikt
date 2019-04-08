import React from 'react';
import { Container } from 'nav-frontend-grid';
import Personrad from './Personrad';
import Sorteringsrad from './Sorteringsrad';
import { PersonregisterState } from '../store/personregister/personregisterTypes';

interface PersonlisteProps {
  fnrListe: string[];
  personregister: PersonregisterState;
}

const Personliste = (props: PersonlisteProps) => {
  const {
    fnrListe,
    personregister,
  } = props;
  return (<Container className="personliste">
    <Sorteringsrad />
    {
      fnrListe.map((fnr: string, idx: number) => {
        return (<Personrad
          key={idx}
          fnr={fnr}
          personData={personregister[fnr]}
        />);
      })
    }
  </Container>);
};

export default Personliste;
