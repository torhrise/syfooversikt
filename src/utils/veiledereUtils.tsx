import { Veileder } from '../store/veiledere/veiledereTypes';

export const sortVeiledereAlphabeticallyBySurname = ((veiledere: Veileder[]) => {
  return veiledere.sort((veileder1, veileder2) => {
    const surname1 = veileder1.etternavn.toLowerCase();
    const surname2 = veileder2.etternavn.toLowerCase();
    return surname1 > surname2
      ? 1
      : surname1 < surname2
        ? -1
        : 0;
  });
});

export const removeCurrentVeilederFromVeiledere = ((veiledere: Veileder[], aktivVeilederIdent: string) => {
  return veiledere.filter((veileder) => {
    return veileder.ident !== aktivVeilederIdent;
  });
});
