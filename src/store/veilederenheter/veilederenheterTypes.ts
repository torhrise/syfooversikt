export interface Veilederenhet {
  enhetId: string;
  navn: string;
}

export interface Veilederenheter {
  enhetliste: Veilederenhet[];
}

export interface VeilederenheterState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: Veilederenheter;
}
