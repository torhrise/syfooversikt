import React from 'react';
import Personrad, { Person } from './Personrad';
import { Container } from 'nav-frontend-grid';
import Sorteringsrad from './Sorteringsrad';

interface PersonlisteProps {
  personer: Person[];
}

const Personliste = (props: PersonlisteProps) => {
  const { personer } = props;
  return (<Container className="personliste">
    <Sorteringsrad />
    {
      personer.map((person: Person, idx: number) => {
        return (<Personrad
          key={idx}
          person={person}
        />);
      })
    }
  </Container>);
};

export default Personliste;
