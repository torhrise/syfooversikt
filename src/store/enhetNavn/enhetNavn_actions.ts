import {
  EnhetNavn,
  EnhetNr,
  EnhetNavnActionTypes
} from './enhetNavnTypes';

export const hentEnhetNavnForespurt = (data: EnhetNr) => ({
  type: EnhetNavnActionTypes.HENT_ENHET_NAVN_FORESPURT,
  data,
});

export const hentEnhetNavnHenter = () => ({
  type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTER,
});

export const hentEnhetNavnHentet = (data: EnhetNavn) => ({
  type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTET,
  data,
});

export const hentEnhetNavnFeilet = () => ({
  type: EnhetNavnActionTypes.HENT_ENHET_NAVN_FEILET,
});
