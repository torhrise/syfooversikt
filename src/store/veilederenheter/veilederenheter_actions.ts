import { Veilederenheter } from './veilederenheterTypes';

export const enum VeilederenheterActionTypes {
  HENT_VEILEDERENHETER_FORESPURT = 'HENT_VEILEDERENHETER_FORESPURT',
  HENT_VEILEDERENHETER_HENTER = 'HENT_VEILEDERENHETER_HENTER',
  HENT_VEILEDERENHETER_HENTET = 'HENT_VEILEDERENHETER_HENTET',
  HENT_VEILEDERENHETER_FEILET = 'HENT_VEILEDERENHETER_FEILET',
}

export const hentVeilederenheter = () => {
  return {
    type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_FORESPURT,
  };
};

export const hentVeilederenheterHenter = () => {
  return {
    type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTER,
  };
};

export const hentVeilederenheterHentet = (data: Veilederenheter) => {
  return {
    type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTET,
    data,
  };
};

export const hentVeilederenheterFeilet = () => {
  return {
    type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_FEILET,
  };
};
