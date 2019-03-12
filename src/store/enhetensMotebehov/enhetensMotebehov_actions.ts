import {
  EnhetensMotebehov,
  EnhetensMotebehovActionTypes
} from './enhetensMotebehovTypes';

export function hentEnhetensMotebehov() {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FORESPURT,
  };
}

export function henterEnhetensMotebehov() {
  return {
    type: EnhetensMotebehovActionTypes.HENTER_ENHETENS_MOTEBEHOV,
  };
}

export function enhetensMotebehovHentet(data: EnhetensMotebehov) {
  return {
    type: EnhetensMotebehovActionTypes.ENHETENS_MOTEBEHOV_HENTET,
    data,
  };
}

export function hentEnhetensMotebehovFeilet() {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FEILET,
  };
}
