import { EnhetensMoterActionTypes } from './enhetensMoterTypes';
import { PersonHendelseData } from '../personregister/personregisterTypes';

export function hentEnhetensMoterForespurt() {
  return {
    type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FORESPURT,
  };
}

export function hentEnhetensMoterHenter() {
  return {
    type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTER,
  };
}

export function hentEnhetensMoterHentet(data: PersonHendelseData[]) {
  return {
    type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTET,
    data,
  };
}

export function hentEnhetensMoterFeilet() {
  return {
    type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FEILET,
  };
}
