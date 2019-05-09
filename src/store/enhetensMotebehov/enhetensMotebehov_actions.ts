import { EnhetensMotebehovActionTypes } from './enhetensMotebehovTypes';
import { PersonHendelseData } from '../personregister/personregisterTypes';

export function hentEnhetensMotebehovForespurt() {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FORESPURT,
  };
}

export function hentEnhetensMotebehovHenter() {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER,
  };
}

export function hentEnhetensMotebehovHentet(data: PersonHendelseData[]) {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET,
    data,
  };
}

export function hentEnhetensMotebehovFeilet() {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FEILET,
  };
}
