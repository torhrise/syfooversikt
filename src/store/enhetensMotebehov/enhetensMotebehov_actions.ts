import {
  EnhetensMotebehovActionTypes,
  MotebehovSvar
} from './enhetensMotebehovTypes';

export function hentEnhetensMotebehov() {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FORESPURT,
  };
}

export function henterEnhetensMotebehov() {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER,
  };
}

export function enhetensMotebehovHentet(data: MotebehovSvar[]) {
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
