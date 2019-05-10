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
