import React, {
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { EtikettInfo } from 'nav-frontend-etiketter';
import Personrad from './Personrad';
import Sorteringsrad from './Sorteringsrad';
import { Veileder } from '../store/veiledere/veiledereTypes';
import { veilederEllerNull } from '../utils/personDataUtil';
import { ApplicationState } from '../store';
import {
  PersonData,
  PersonregisterState,
} from '../store/personregister/personregisterTypes';
import {
  SortingType,
  getSortedEventsFromSortingType,
} from '../utils/hendelseFilteringUtils';

interface PersonlisteProps {
  personregister: PersonregisterState;
  checkboxHandler: (fnr: string) => void;
  markertePersoner: string[];
  veiledere: Veileder[];
}

const PersonlisteStyled = styled.div`
`;

export const VeilederNavn = styled.label`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const EtikettFokusStyled = styled(EtikettInfo)`
  padding: 2px 4px !important;
`;

const UfordeltBrukerEtikett = () => <EtikettFokusStyled>Ufordelt</EtikettFokusStyled>;

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

export const getVeilederComponent = (show: boolean, veiledere: Veileder[], personData: PersonData) => {
  if (!show) return <div />;
  const veilederName = veilederEllerNull(veilederForPerson(veiledere, personData));
  return veilederName === null
    ? <UfordeltBrukerEtikett />
    : <VeilederNavn>{veilederName}</VeilederNavn>;
};

const Personliste = (props: PersonlisteProps) => {
  const {
    personregister,
    checkboxHandler,
    markertePersoner,
    veiledere,
  } = props;

  const [ selectedSortingType, setSortingType ] = useState<SortingType>('NONE');
  const fnrListe = Object.keys(getSortedEventsFromSortingType(personregister, selectedSortingType));

  const isVeilederDataLoaded = useSelector((state: ApplicationState) => state.veiledere.hentet);

  return (<PersonlisteStyled>
    <Sorteringsrad onSortClick={(type) => {
      setSortingType(type);
    }} />
    {
      fnrListe.map((fnr: string, idx: number) => {
        return (<Personrad
          index={idx}
          key={JSON.stringify(personregister[fnr])}
          fnr={fnr}
          veilederComponent={getVeilederComponent(!isVeilederDataLoaded, veiledere, personregister[fnr])}
          personData={personregister[fnr]}
          checkboxHandler={checkboxHandler}
          kryssAv={erMarkert(markertePersoner, fnr)}
        />);
      })
    }
  </PersonlisteStyled>);
};

export default Personliste;
