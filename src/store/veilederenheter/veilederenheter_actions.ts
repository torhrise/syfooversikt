import { Veilederenheter } from './veilederenheterTypes';

export const enum VeilederenheterActionTypes {
  HENT_VEILEDERENHETER_FORESPURT = 'HENT_VEILEDERENHETER_FORESPURT',
  HENT_VEILEDERENHETER_HENTER = 'HENT_VEILEDERENHETER_HENTER',
  HENT_VEILEDERENHETER_HENTET = 'HENT_VEILEDERENHETER_HENTET',
  HENT_VEILEDERENHETER_FEILET = 'HENT_VEILEDERENHETER_FEILET',
}

export function hentVeilederenheter() {
  return {
    type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_FORESPURT,
  };
}

export function hentVeilederenheterHenter() {
  return {
    type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTER,
  };
}

export function hentVeilederenheterHentet(data: Veilederenheter) {
  return {
    type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTET,
    data,
  };
}

export function hentVeilederenheterFeilet() {
  return {
    type: VeilederenheterActionTypes.HENT_VEILEDERENHETER_FEILET,
  };
}
