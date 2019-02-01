export interface Modiacontext {
  aktivBruker: string | null;
  aktivEnhet: string | null;
}

export interface HentAktivEnhetData {
  callback(a: any): any;
}

export interface ModiacontextPayload {
  verdi: string;
  eventType: string;
}

export const enum modiacontextActionTypes {
  PUSH_MODIACONTEXT_FORESPURT = 'PUSH_MODIACONTEXT_FORESPURT',
  PUSH_MODIACONTEXT_FEILET = 'PUSH_MODIACONTEXT_FEILET',
  MODIACONTEXT_PUSHET = 'MODIACONTEXT_PUSHET',
  PUSHER_MODIACONTEXT = 'PUSHER_MODIACONTEXT',
  HENT_AKTIVENHET_FORESPURT = 'HENT_AKTIVENHET_FORESPURT',
  HENTER_AKTIVENHET = 'HENTER_AKTIVENHET',
  HENT_AKTIVENHET_FEILET = 'HENT_AKTIVENHET_FEILET',
  AKTIVENHET_HENTET = 'AKTIVENHET_HENTET',
}

export interface ModiacontextState {
  readonly pushet: boolean;
  readonly pusher: boolean;
  readonly pushingFeilet: boolean;
  readonly henterEnhet: boolean;
  readonly hentingEnhetFeilet: boolean;
  readonly data: Modiacontext | {};
}
