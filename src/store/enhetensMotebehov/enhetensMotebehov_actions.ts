import { PersonHendelseData } from '../personregister/personregisterTypes';

export const enum EnhetensMotebehovActionTypes {
  HENT_ENHETENS_MOTEBEHOV_FORESPURT = 'HENT_ENHETENS_MOTEBEHOV_FORESPURT',
  HENT_ENHETENS_MOTEBEHOV_HENTER = 'HENT_ENHETENS_MOTEBEHOV_HENTER',
  HENT_ENHETENS_MOTEBEHOV_FEILET = 'HENT_ENHETENS_MOTEBEHOV_FEILET',
  HENT_ENHETENS_MOTEBEHOV_HENTET = 'HENT_ENHETENS_MOTEBEHOV_HENTET',
}

export const hentEnhetensMotebehovForespurt = () => {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FORESPURT,
  };
};

export const hentEnhetensMotebehovHenter = () => {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTER,
  };
};

export const hentEnhetensMotebehovHentet = (data: PersonHendelseData[]) => {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET,
    data,
  };
};

export const hentEnhetensMotebehovFeilet = () => {
  return {
    type: EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FEILET,
  };
};
