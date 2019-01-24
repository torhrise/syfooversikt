import {
  Veilederinfo,
  VeilederinfoActionTypes
} from './veilederinfoTypes';

export function hentVeilederinfo() {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_FORESPURT,
  };
}

export function henterVeilederinfo() {
  return {
    type: VeilederinfoActionTypes.HENTER_VEILEDERINFO,
  };
}

export function veilederinfoHentet(data: Veilederinfo) {
  return {
    type: VeilederinfoActionTypes.VEILEDERINFO_HENTET,
    data,
  };
}

export function hentVeilederinfoFeilet() {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_FEILET,
  };
}
