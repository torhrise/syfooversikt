import {
  PersonNavn,
  Fodselsnummer,
} from './personNavnTypes';

export const enum PersonNavnActionTypes {
  HENT_PERSON_NAVN_FORESPURT = 'HENT_PERSON_NAVN_FORESPURT',
  HENT_PERSON_NAVN_HENTER = 'HENT_PERSON_NAVN_HENTER',
  HENT_PERSON_NAVN_FEILET = 'HENT_PERSON_NAVN_FEILET',
  HENT_PERSON_NAVN_HENTET = 'HENT_PERSON_NAVN_HENTET',
}

export const hentPersonNavnForespurt = (data: Fodselsnummer[]) => {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_FORESPURT,
    data,
  };
};

export const hentPersonNavnHenter = () => {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTER,
  };
};

export const hentPersonNavnHentet = (data: PersonNavn[]) => {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET,
    data,
  };
};

export const hentPersonNavnFeilet = () => {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_FEILET,
  };
};
