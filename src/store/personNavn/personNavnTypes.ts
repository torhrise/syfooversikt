export interface AktorId {
  aktorId: string;
}

export interface PersonNavn {
  navnListe: string[];
}

export const enum PersonNavnActionTypes {
  HENT_PERSON_NAVN_FORESPURT = 'HENT_PERSON_NAVN_FORESPURT',
  HENT_PERSON_NAVN_HENTER = 'HENT_PERSON_NAVN_HENTER',
  HENT_PERSON_NAVN_FEILET = 'HENT_PERSON_NAVN_FEILET',
  HENT_PERSON_NAVN_HENTET = 'HENT_PERSON_NAVN_HENTET',
}

export interface PersonNavnState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: string[];
}
