import { PersonData } from '../store/personregister/personregisterTypes';

export const skjermingskode = (person: PersonData) => {
  return person.skjermingskode && person.skjermingskode !== 'INGEN'
    ? person.skjermingskode.toLowerCase().replace('_', ' ')
    : '';
};

export const hendelsestypeString = {
  motebehovMote: 'Møtebehov/Møte',
  motebehov: 'Møtebehov',
  mote: 'Møte',
  ingen: '',
};

export const hendelsestype = (person: PersonData) => {
  if (person.harSvartPaaMotebehov) {
    if (person.harMote) {
      return hendelsestypeString.motebehovMote;
    }
    return hendelsestypeString.motebehov;
  }
  if (person.harMote) {
    return hendelsestypeString.mote;
  }
  return hendelsestypeString.ingen;
};
