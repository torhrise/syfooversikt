import { Veilederinfo } from './veilederinfoTypes';

export const enum VeilederinfoActionTypes {
  HENT_VEILEDERINFO_FORESPURT = 'HENT_VEILEDERINFO_FORESPURT',
  HENT_VEILEDERINFO_HENTER = 'HENT_VEILEDERINFO_HENTER',
  HENT_VEILEDERINFO_FEILET = 'HENT_VEILEDERINFO_FEILET',
  HENT_VEILEDERINFO_HENTET = 'HENT_VEILEDERINFO_HENTET',
}

export function hentVeilederinfo() {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_FORESPURT,
  };
}

export function henterVeilederinfo() {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_HENTER,
  };
}

export function veilederinfoHentet(data: Veilederinfo) {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_HENTET,
    data,
  };
}

export function hentVeilederinfoFeilet() {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_FEILET,
  };
}
