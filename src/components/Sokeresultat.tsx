import React from 'react';
import Toolbar from './toolbar/Toolbar';
import Personliste from './Personliste';
import { OversiktContainerProps } from '../containers/OversiktContainer';

const Sokeresultat = (props: OversiktContainerProps) => {
  const {
    personregister,
  } = props;

  const fnrListe = Object.keys(personregister);

  return (
    <div>
      <Toolbar />
      <Personliste
        fnrListe={fnrListe}
        personregister={personregister}
      />
    </div>);
};

export default Sokeresultat;