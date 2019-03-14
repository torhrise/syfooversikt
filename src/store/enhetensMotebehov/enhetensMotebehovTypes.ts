export interface MotebehovSvar {
  fnr: string;
  skjermetEllerEgenAnsatt: boolean;
}

export interface EnhetensMotebehov {
  motebehovSvar: MotebehovSvar[];
}

export const enum EnhetensMotebehovActionTypes {
  HENT_ENHETENS_MOTEBEHOV_FORESPURT = 'HENT_ENHETENS_MOTEBEHOV_FORESPURT',
  HENTER_ENHETENS_MOTEBEHOV = 'HENTER_ENHETENS_MOTEBEHOV',
  HENT_ENHETENS_MOTEBEHOV_FEILET = 'HENT_ENHETENS_MOTEBEHOV_FEILET',
  ENHETENS_MOTEBEHOV_HENTET = 'ENHETENS_MOTEBEHOV_HENTET',
}

export interface EnhetensMotebehovState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: MotebehovSvar[];
}