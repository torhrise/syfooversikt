import {
  PersonNavn,
  PersonNavnActionTypes
} from './personNavnTypes';

export function hentPersonNavn() {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_FORESPURT
  };
}

export function henterPersonNavn() {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTER
  };
}

export function personNavnHentet(data: PersonNavn) {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET,
    data,
  };
}

export function hentPersonNavnFeilet() {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_FEILET
  };
}
