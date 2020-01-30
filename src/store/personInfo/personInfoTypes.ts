export interface Fodselsnummer {
  fnr: string;
}

export interface PersonInfo {
  fnr: string;
  skjermingskode: string;
}

export interface PersonInfoState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: PersonInfo[];
}
