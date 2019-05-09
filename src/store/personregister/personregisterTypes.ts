export interface PersonData {
  navn: string;
  harSvartPaaMotebehov: boolean;
  harMote: boolean;
  skjermingskode: string;
  markert: boolean;
}

export interface PersonregisterState {
  [fnr: string]: PersonData;
}

export interface PersonHendelseData {
  fnr: string;
  skjermingskode: string;
}

export const enum PersonregisterActionTypes {
  TOGGLE_PERSON_MARKERT = 'TOGGLE_PERSON_MARKERT',
  TOGGLE_VELG_ALLE = 'TOGGLE_VELG_ALLE',
}
