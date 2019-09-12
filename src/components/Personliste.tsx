import React, { useState } from 'react';
import Personrad from './Personrad';
import Sorteringsrad from './Sorteringsrad';
import { PersonData, PersonregisterState } from '../store/personregister/personregisterTypes';
import { Veileder } from '../store/veiledere/veiledereTypes';
import styled from 'styled-components';
import { SortingType, getSortedEventsFromSortingType } from '../utils/hendelseFilteringUtils';

interface PersonlisteProps {
  personregister: PersonregisterState;
  checkboxHandler: (fnr: string ) => void;
  markertePersoner: string[];
  veiledere: Veileder[];
}

const PersonlisteStyled = styled.section`
  padding: 0 .5em;
`;

const erMarkert = (markertePersoner: string[], fnr: string) => {
  return markertePersoner.findIndex((markertPerson: string) => {
    return markertPerson === fnr;
  }) !== -1;
};

const veilederForPerson = ((veiledere: Veileder[], person: PersonData) => {
  if (person.tildeltVeilederIdent) {
    return veiledere.find((veileder) => {
      return veileder.ident === person.tildeltVeilederIdent;
    });
  }
  return undefined;
});

const Personliste = (props: PersonlisteProps) => {
  const {
    personregister,
    checkboxHandler,
    markertePersoner,
    veiledere,
  } = props;

  const [ selectedSortingType, setSortingType ] = useState<SortingType>('NONE');
  const fnrListe = Object.keys(getSortedEventsFromSortingType(personregister, selectedSortingType));

  return (<PersonlisteStyled>
    <Sorteringsrad  onSortClick={(type) => {
      setSortingType(type);
    }} />
    {
      fnrListe.map((fnr: string, idx: number) => {
        return (<Personrad
          key={idx}
          fnr={fnr}
          personData={personregister[fnr]}
          checkboxHandler={checkboxHandler}
          kryssAv={erMarkert(markertePersoner, fnr)}
          veileder={veilederForPerson(veiledere, personregister[fnr])}
        />);
      })
    }
    </PersonlisteStyled>);
};

export default Personliste;
