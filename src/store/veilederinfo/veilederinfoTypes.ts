export interface Veilederinfo {
  ident: string;
}

export const enum VeilederinfoActiontypes {
  HENT_VEILEDERINFO_FORESPURT = 'HENT_VEILEDERINFO_FORESPURT',
  HENTER_VEILEDERINFO = 'HENTER_VEILEDERINFO',
  HENT_VEILEDERINFO_FEILET = 'HENT_VEILEDERINFO_FEILET',
  VEILEDERINFO_HENTET = 'VEILEDERINFO_HENTET',
}

export interface VeilederinfoState {
  readonly hentet: false;
  readonly henter: false;
  readonly hentingFeilet: false;
  readonly data: Veilederinfo;
}
