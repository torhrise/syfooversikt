import {
  PersonNavn,
  AktorId,
  PersonNavnActionTypes
} from './personNavnTypes';

export function hentPersonNavn(data: AktorId[]) {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_FORESPURT,
    data
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
    data
  };
}

export function hentPersonNavnFeilet() {
  return {
    type: PersonNavnActionTypes.HENT_PERSON_NAVN_FEILET
  };
}