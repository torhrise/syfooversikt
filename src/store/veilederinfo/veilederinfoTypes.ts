export interface Veilederinfo {
  ident: string;
}

export const enum VeilederinfoActionTypes {
  HENT_VEILEDERINFO_FORESPURT = 'HENT_VEILEDERINFO_FORESPURT',
  HENT_VEILEDERINFO_HENTER = 'HENT_VEILEDERINFO_HENTER',
  HENT_VEILEDERINFO_FEILET = 'HENT_VEILEDERINFO_FEILET',
  HENT_VEILEDERINFO_HENTET = 'HENT_VEILEDERINFO_HENTET',
}

export interface VeilederinfoState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: Veilederinfo;
}
