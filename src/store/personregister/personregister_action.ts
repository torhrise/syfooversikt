import { PersonregisterActionTypes } from './personregisterTypes';

export function togglePersonMarkert(fnr: string) {
  return {
    type: PersonregisterActionTypes.TOGGLE_PERSON_MARKERT,
    fnr
  };
}

export function toggleVelgAlle(kryssetAv: boolean) {
  return {
    type: PersonregisterActionTypes.TOGGLE_VELG_ALLE,
    kryssetAv
  };
}
