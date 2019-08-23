import { Veileder } from '../store/veiledere/veiledereTypes';

export const sortVeiledereAlphabeticallyBySurname = ((veiledere: Veileder[]) => {
  return veiledere.sort((veileder1, veileder2) => {
    const surname1 = veileder1.etternavn.toLowerCase();
    const surname2 = veileder2.etternavn.toLowerCase();
    const firstname1 = veileder1.fornavn.toLowerCase();
    const firstname2 = veileder2.fornavn.toLowerCase();

    return surname1 === surname2
      ? firstname1.localeCompare(firstname2)
      : surname1.localeCompare(surname2);
  });
});

export const removeCurrentVeilederFromVeiledere = ((veiledere: Veileder[], aktivVeilederIdent: string) => {
  return veiledere.filter((veileder) => {
    return veileder.ident !== aktivVeilederIdent;
  });
});
