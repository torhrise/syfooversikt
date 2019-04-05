export interface Person {
  navn: string;
  harSvartPaaMotebehov: boolean;
  skjermingskode: string;
}

export interface Personer {
  [fnr: string]: Person;
}

export interface PersonregisterState {
  [fnr: string]: Person;
}
