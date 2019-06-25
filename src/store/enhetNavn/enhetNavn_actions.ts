import {
  EnhetNavn,
  EnhetNr,
  EnhetNavnActionTypes
} from './enhetNavnTypes';

export const hentEnhetNavnForespurt = (data: EnhetNr) => {
  return {
    type: EnhetNavnActionTypes.HENT_ENHET_NAVN_FORESPURT,
    data,
  };
};

export const hentEnhetNavnHenter = () => {
  return {
    type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTER,
  };
};

export const hentEnhetNavnHentet = (data: EnhetNavn) => {
  return {
    type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTET,
    data,
  };
};

export const hentEnhetNavnFeilet = () => {
  return {
    type: EnhetNavnActionTypes.HENT_ENHET_NAVN_FEILET,
  };
};
