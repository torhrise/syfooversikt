import {
  EnhetNavn,
  EnhetNr,
  EnhetNavnActionTypes
} from './enhetNavnTypes';

export function hentEnhetNavnForespurt(data: EnhetNr) {
  return {
    type: EnhetNavnActionTypes.HENT_ENHET_NAVN_FORESPURT,
    data,
  };
}

export function hentEnhetNavnHenter() {
  return {
    type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTER,
  };
}

export function hentEnhetNavnHentet(data: EnhetNavn) {
  return {
    type: EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTET,
    data,
  };
}

export function hentEnhetNavnFeilet() {
  return {
    type: EnhetNavnActionTypes.HENT_ENHET_NAVN_FEILET,
  };
}
