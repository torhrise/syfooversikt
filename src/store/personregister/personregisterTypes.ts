export interface PersonData {
  navn: string;
  harSvartPaaMotebehov: boolean;
  skjermingskode: string;
  markert: boolean;
}

export interface Personer {
  [fnr: string]: PersonData;
}

export interface PersonregisterState {
  [fnr: string]: PersonData;
}

export const enum PersonregisterActionTypes {
  TOGGLE_PERSON_MARKERT = 'TOGGLE_PERSON_MARKERT',
  TOGGLE_VELG_ALLE = 'TOGGLE_VELG_ALLE',
}
