import { Veilederinfo } from './veilederinfoTypes';

export const enum VeilederinfoActionTypes {
  HENT_VEILEDERINFO_FORESPURT = 'HENT_VEILEDERINFO_FORESPURT',
  HENT_VEILEDERINFO_HENTER = 'HENT_VEILEDERINFO_HENTER',
  HENT_VEILEDERINFO_FEILET = 'HENT_VEILEDERINFO_FEILET',
  HENT_VEILEDERINFO_HENTET = 'HENT_VEILEDERINFO_HENTET',
}

export const hentVeilederinfo = () => {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_FORESPURT,
  };
};

export const henterVeilederinfo = () => {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_HENTER,
  };
};

export const veilederinfoHentet = (data: Veilederinfo) => {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_HENTET,
    data,
  };
};

export const hentVeilederinfoFeilet = () => {
  return {
    type: VeilederinfoActionTypes.HENT_VEILEDERINFO_FEILET,
  };
};
