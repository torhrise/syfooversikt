export interface Veilederinfo {
  ident: string;
}

export const enum VeilederinfoActionTypes {
  HENT_VEILEDERINFO_FORESPURT = 'HENT_VEILEDERINFO_FORESPURT',
  HENTER_VEILEDERINFO = 'HENTER_VEILEDERINFO',
  HENT_VEILEDERINFO_FEILET = 'HENT_VEILEDERINFO_FEILET',
  VEILEDERINFO_HENTET = 'VEILEDERINFO_HENTET',
}

export interface VeilederinfoState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: Veilederinfo;
}
