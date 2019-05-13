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
