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

export const hentAktivEnhet = (data: HentAktivEnhetData) => {
  return {
    type: modiacontextActionTypes.HENT_AKTIVENHET_FORESPURT,
    data,
  };
};

export const hentAktivEnhetFeilet = () => {
  return {
    type: modiacontextActionTypes.HENT_AKTIVENHET_FEILET,
  };
};

export const henterAktivEnhet = () => {
  return {
    type: modiacontextActionTypes.HENT_AKTIVENHET_HENTER,
  };
};

export const aktivEnhetHentet = (data: Modiacontext) => {
  return {
    type: modiacontextActionTypes.HENT_AKTIVENHET_HENTET,
    data,
  };
};

export const pushModiaContextFeilet = () => {
  return {
    type: modiacontextActionTypes.PUSH_MODIACONTEXT_FEILET,
  };
};

export const pusherModiaContext = () => {
  return {
    type: modiacontextActionTypes.PUSH_MODIACONTEXT_PUSHER,
  };
};

export const pushModiaContext = (data: ModiacontextPayload) => {
  return {
    type: modiacontextActionTypes.PUSH_MODIACONTEXT_FORESPURT,
    data,
  };
};

export const modiaContextPushet = () => {
  return {
    type: modiacontextActionTypes.PUSH_MODIACONTEXT_PUSHET,
  };
};
