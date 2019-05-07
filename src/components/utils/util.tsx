import { MotebehovSvar } from '../../store/enhetensMotebehov/enhetensMotebehovTypes';
import { Fodselsnummer } from '../../store/personNavn/personNavnTypes';

export const hentFodselsnummerFraMotebehovSvar = (svarListe: MotebehovSvar[]) => {
  return svarListe.map((motebehovSvar) => {
    return {fnr: motebehovSvar.fnr};
  });
};

const hentFnrFraFodselsnummer = (fodselsnummerListe: Fodselsnummer[]) => {
  return fodselsnummerListe.map((fodselsnummer) => {
    return fodselsnummer.fnr;
  });
};

export const hentFnrFraMotebehovSvar = (svarListe: MotebehovSvar[]) => {
  return hentFnrFraFodselsnummer(hentFodselsnummerFraMotebehovSvar(svarListe));
};
