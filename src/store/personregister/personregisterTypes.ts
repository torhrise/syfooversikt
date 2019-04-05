export interface PersonData {
  navn: string;
  harSvartPaaMotebehov: boolean;
  skjermingskode: string;
}

export interface Personer {
  [fnr: string]: PersonData;
}

export interface PersonregisterState {
  [fnr: string]: PersonData;
}
