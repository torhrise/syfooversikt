import {
  NavIdent,
  VeilederNavn,
  VeilederNavnActionTypes,
} from './veilederNavnTypes';

export function hentVeilederNavnForespurt(navident: NavIdent) {
  return {
    type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_FORESPURT,
    navident,
  };
}

export function hentVeilederNavnHenter() {
  return {
    type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTER,
  };
}

export function hentVeilederNavnHentet(data: VeilederNavn) {
  return {
    type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTET,
    data,
  };
}

export function hentVeilederNavnFeilet() {
  return {
    type: VeilederNavnActionTypes.HENT_VEILEDER_NAVN_FEILET,
  };
}
