import {
  PersonNavn,
  Fodselsnummer,
  PersonNavnActionTypes
} from './personNavnTypes';

export function hentPersonNavnForespurt(data: Fodselsnummer[]) {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_FORESPURT,
    data
  };
}

export function hentPersonNavnHenter() {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTER
  };
}

export function hentPersonNavnHentet(data: PersonNavn[]) {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET,
    data
  };
}

export function hentPersonNavnFeilet() {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_FEILET
  };
}
