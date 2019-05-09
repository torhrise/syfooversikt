import { expect } from 'chai';
import { PersonHendelseData } from '../../src/store/personregister/personregisterTypes';
import * as testdata from '../../Mock/Data/fellesTestdata.json';
import { Fodselsnummer } from '../../src/store/personNavn/personNavnTypes';
import { hentFodselsnummerFraPersonHendelseListe } from '../../src/components/utils/util';

describe('utils', () => {
  describe('hentFodselsnummerFraPersonHendelseListe', () => {
    it('Skal returnere en liste med Fodselsnummer fra en liste med personhendelser', () => {
      const svarListe: PersonHendelseData[] = [
        {
          fnr: testdata.fnr1,
          skjermingskode: testdata.skjermingskode.ingen,
        },
        {
          fnr: testdata.fnr2,
          skjermingskode: testdata.skjermingskode.egenAnsatt,
        },
      ];

      const forventetListe: Fodselsnummer[] = [
        {
          fnr: testdata.fnr1,
        },
        {
          fnr: testdata.fnr2,
        },
      ];

      const returnertListe = hentFodselsnummerFraPersonHendelseListe(svarListe);

      expect(returnertListe).to.deep.equal(forventetListe);
    });
  });
});
