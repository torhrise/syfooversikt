export const enum personoversiktActionTypes {
  HENT_PERSONOVERSIKT_ENHET_FORESPURT = 'HENT_PERSONOVERSIKT_ENHET_FORESPURT',
  HENT_PERSONOVERSIKT_ENHET_HENTER = 'HENT_PERSONOVERSIKT_ENHET_HENTER',
  HENT_PERSONOVERSIKT_ENHET_HENTET = 'HENT_PERSONOVERSIKT_ENHET_HENTET',
  HENT_PERSONOVERSIKT_ENHET_FEILET= 'HENT_PERSONOVERSIKT_ENHET_FEILET',
}

export const hentPersonoversiktForespurt = (enhet: string) => {
  return {
    type: personoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_FORESPURT,
    enhet,
  };
};

export const hentPersonoversiktHenter = () => {
  return {
    type: personoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTER,
  };
};

export const hentPersonoversiktHentet = () => {
  return {
    type: personoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTET,
  };
};

export const hentPersonoversiktFeilet = () => {
  return {
    type: personoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_FEILET,
  };
};
