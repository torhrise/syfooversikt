import React from 'react';
import Toolbar from './toolbar/Toolbar';
import Personliste from './Personliste';
import { Fodselsnummer } from '../store/personNavn/personNavnTypes';
import { OversiktContainerProps } from '../containers/OversiktContainer';
import { hentFodselsnummerFraMotebehovSvar } from './utils/util';

const Sokeresultat = (props: OversiktContainerProps) => {
  const {
    personregister,
    enhetensMotebehov,
  } = props;

  const svarListe = enhetensMotebehov.data;

  const fnrListe = hentFnrFraFodselsnummer(hentFodselsnummerFraMotebehovSvar(svarListe));

  return (
    <div>
      <Toolbar />
      <Personliste
        fnrListe={fnrListe}
        personregister={personregister}
      />
    </div>);
};

const hentFnrFraFodselsnummer = (fodselsnummerListe: Fodselsnummer[]) => {
  return fodselsnummerListe.map((fodselsnummer) => {
    return fodselsnummer.fnr;
  });
};

export default Sokeresultat;
