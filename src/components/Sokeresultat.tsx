import React from 'react';
import Toolbar from './toolbar/Toolbar';
import Personliste from './Personliste';
import { Fodselsnummer } from '../store/personNavn/personNavnTypes';
import { MotebehovSvar } from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import { OversiktContainerProps } from '../containers/OversiktContainer';

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

const hentFodselsnummerFraMotebehovSvar = (svarListe: MotebehovSvar[]) => {
  return svarListe.map((motebehovSvar) => {
    return {fnr: motebehovSvar.fnr};
  });
};

export default Sokeresultat;
