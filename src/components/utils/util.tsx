import { MotebehovSvar } from '../../store/enhetensMotebehov/enhetensMotebehovTypes';

export const hentFodselsnummerFraMotebehovSvar = (svarListe: MotebehovSvar[]) => {
  return svarListe.map((motebehovSvar) => {
    return {fnr: motebehovSvar.fnr};
  });
};
