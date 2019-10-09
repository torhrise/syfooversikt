import { Veileder } from './veiledereTypes';

export const enum VeiledereActionTypes {
  HENT_VEILEDERE_FORESPURT = 'HENT_VEILEDERE_FORESPURT',
  HENT_VEILEDERE_HENTER = 'HENT_VEILEDERE_HENTER',
  HENT_VEILEDERE_FEILET = 'HENT_VEILEDERE_FEILET',
  HENT_VEILEDERE_HENTET = 'HENT_VEILEDERE_HENTET',
}

export const hentVeiledere = () => ({
  type: VeiledereActionTypes.HENT_VEILEDERE_FORESPURT,
});

export const henterVeiledere = () => ({
  type: VeiledereActionTypes.HENT_VEILEDERE_HENTER,
});

export const veiledereHentet = (data: Veileder[]) => ({
  type: VeiledereActionTypes.HENT_VEILEDERE_HENTET,
  data,
});

export const hentVeiledereFeilet = () => ({
  type: VeiledereActionTypes.HENT_VEILEDERE_FEILET,
});
