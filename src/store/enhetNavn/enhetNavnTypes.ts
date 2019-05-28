export interface EnhetNr {
  enhetNr: string;
}

export interface EnhetNavn {
  enhetNr: string;
  navn: string;
}

export const enum EnhetNavnActionTypes {
  HENT_ENHET_NAVN_FORESPURT = 'HENT_ENHET_NAVN_FORESPURT',
  HENT_ENHET_NAVN_HENTER = 'HENT_ENHET_NAVN_HENTER',
  HENT_ENHET_NAVN_FEILET = 'HENT_ENHET_NAVN_FEILET',
  HENT_ENHET_NAVN_HENTET = 'HENT_ENHET_NAVN_HENTET',
}

export interface EnhetNavnState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: EnhetNavn;
}
