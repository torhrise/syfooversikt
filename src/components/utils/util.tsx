import { PersonHendelseData } from '../../store/personregister/personregisterTypes';

export const hentFodselsnummerFraPersonHendelseListe = (svarListe: PersonHendelseData[]) => {
  return svarListe.map((hendelseObjekt) => {
    return {fnr: hendelseObjekt.fnr};
  });
};
