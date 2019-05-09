import { PersonHendelseData } from '../personregister/personregisterTypes';

export const enum EnhetensMoterActionTypes {
  HENT_ENHETENS_MOTER_FORESPURT = 'HENT_ENHETENS_MOTER_FORESPURT',
  HENT_ENHETENS_MOTER_HENTER = 'HENT_ENHETENS_MOTER_HENTER',
  HENT_ENHETENS_MOTER_FEILET = 'HENT_ENHETENS_MOTER_FEILET',
  HENT_ENHETENS_MOTER_HENTET = 'HENT_ENHETENS_MOTER_HENTET',
}

export interface EnhetensMoterState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: PersonHendelseData[];
}
