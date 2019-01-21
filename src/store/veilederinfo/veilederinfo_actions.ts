import { Veilederinfo, VeilederinfoActiontypes } from './veilederinfoTypes';

export function hentVeilederinfo() {
  return {
    type: VeilederinfoActiontypes.HENT_VEILEDERINFO_FORESPURT,
  };
}

export function henterVeilederinfo() {
  return {
    type: VeilederinfoActiontypes.HENTER_VEILEDERINFO,
  };
}

export function veilederinfoHentet(data: Veilederinfo) {
  return {
    type: VeilederinfoActiontypes.VEILEDERINFO_HENTET,
    data,
  };
}

export function hentVeilederinfoFeilet() {
  return {
    type: VeilederinfoActiontypes.HENT_VEILEDERINFO_FEILET,
  };
}
