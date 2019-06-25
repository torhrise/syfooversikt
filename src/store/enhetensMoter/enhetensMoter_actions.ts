import { PersonHendelseData } from '../personregister/personregisterTypes';

export const enum EnhetensMoterActionTypes {
  HENT_ENHETENS_MOTER_FORESPURT = 'HENT_ENHETENS_MOTER_FORESPURT',
  HENT_ENHETENS_MOTER_HENTER = 'HENT_ENHETENS_MOTER_HENTER',
  HENT_ENHETENS_MOTER_FEILET = 'HENT_ENHETENS_MOTER_FEILET',
  HENT_ENHETENS_MOTER_HENTET = 'HENT_ENHETENS_MOTER_HENTET',
}

export const hentEnhetensMoterForespurt = () => {
  return {
    type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FORESPURT,
  };
};

export const hentEnhetensMoterHenter = () => {
  return {
    type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTER,
  };
};

export const hentEnhetensMoterHentet = (data: PersonHendelseData[]) => {
  return {
    type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTET,
    data,
  };
};

export const hentEnhetensMoterFeilet = () => {
  return {
    type: EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FEILET,
  };
};
