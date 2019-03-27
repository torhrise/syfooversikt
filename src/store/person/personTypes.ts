export interface Person {
  fnr: string;
  navn: string;
  skjermetEllerEgenAnsatt: boolean;
}

export interface Personer {
  [fnr: number]: Person;
}

export interface PersonState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: Personer;
}
