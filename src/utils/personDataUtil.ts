import { PersonData } from '../store/personregister/personregisterTypes';

export const skjermingskode = (person: PersonData) => {
  return person.skjermingskode !== 'INGEN'
    ? person.skjermingskode.toLowerCase().replace('_', ' ')
    : '';
};
