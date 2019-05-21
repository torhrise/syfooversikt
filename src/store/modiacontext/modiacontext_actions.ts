import {
  HentAktivEnhetData,
  Modiacontext,
  ModiacontextPayload,
} from './modiacontextTypes';

export const enum modiacontextActionTypes {
  PUSH_MODIACONTEXT_FORESPURT = 'PUSH_MODIACONTEXT_FORESPURT',
  PUSH_MODIACONTEXT_FEILET = 'PUSH_MODIACONTEXT_FEILET',
  PUSH_MODIACONTEXT_PUSHET = 'PUSH_MODIACONTEXT_PUSHET',
  PUSH_MODIACONTEXT_PUSHER = 'PUSH_MODIACONTEXT_PUSHER',
  HENT_AKTIVENHET_FORESPURT = 'HENT_AKTIVENHET_FORESPURT',
  HENT_AKTIVENHET_HENTER = 'HENT_AKTIVENHET_HENTER',
  HENT_AKTIVENHET_FEILET = 'HENT_AKTIVENHET_FEILET',
  HENT_AKTIVENHET_HENTET = 'HENT_AKTIVENHET_HENTET',
}

export function hentAktivEnhet(data: HentAktivEnhetData) {
  return {
    type: modiacontextActionTypes.HENT_AKTIVENHET_FORESPURT,
    data,
  };
}

export function hentAktivEnhetFeilet() {
  return {
    type: modiacontextActionTypes.HENT_AKTIVENHET_FEILET,
  };
}

export function henterAktivEnhet() {
  return {
    type: modiacontextActionTypes.HENT_AKTIVENHET_HENTER,
  };
}

export function aktivEnhetHentet(data: Modiacontext) {
  return {
    type: modiacontextActionTypes.HENT_AKTIVENHET_HENTET,
    data,
  };
}

export function pushModiaContextFeilet() {
  return {
    type: modiacontextActionTypes.PUSH_MODIACONTEXT_FEILET,
  };
}

export function pusherModiaContext() {
  return {
    type: modiacontextActionTypes.PUSH_MODIACONTEXT_PUSHER,
  };
}

export function pushModiaContext(data: ModiacontextPayload) {
  return {
    type: modiacontextActionTypes.PUSH_MODIACONTEXT_FORESPURT,
    data,
  };
}

export function modiaContextPushet() {
  return {
    type: modiacontextActionTypes.PUSH_MODIACONTEXT_PUSHET,
  };
}
