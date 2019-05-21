export interface Fodselsnummer {
  fnr: string;
}

export interface PersonNavn {
  fnr: string;
  navn: string;
}

export interface PersonNavnState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: PersonNavn[];
}
