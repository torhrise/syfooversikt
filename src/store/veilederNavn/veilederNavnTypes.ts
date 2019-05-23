export interface VeilederNavn {
  id: string;
  navn: string;
  fornavn: string;
  etternavn: string;
}

export interface NavIdent {
  ident: string;
}

export const enum VeilederNavnActionTypes {
  HENT_VEILEDER_NAVN_FORESPURT = 'HENT_VEILEDER_NAVN_FORESPURT',
  HENT_VEILEDER_NAVN_HENTER = 'HENT_VEILEDER_NAVN_HENTER',
  HENT_VEILEDER_NAVN_FEILET = 'HENT_VEILEDER_NAVN_FEILET',
  HENT_VEILEDER_NAVN_HENTET = 'HENT_VEILEDER_NAVN_HENTET',
}

export interface VeilederNavnState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  data: {[ident: string]: VeilederNavn};
}
