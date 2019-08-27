import { PersonData } from '../store/personregister/personregisterTypes';
import { Veileder } from '../store/veiledere/veiledereTypes';

export const skjermingskode = (person: PersonData) => {
  return person.skjermingskode && person.skjermingskode !== 'INGEN'
    ? person.skjermingskode.toLowerCase().replace('_', ' ')
    : '';
};

export const veilederEllerUfordelt = (veileder?: Veileder) => {
  return veileder
    ? `${veileder.etternavn}, ${veileder.fornavn}`
    : 'Ufordelt bruker';
};

export const hendelsestypeString = {
  motebehovMote: 'Møtebehov/Møte',
  motebehov: 'Møtebehov',
  mote: 'Møte',
  ingen: '',
};

export const hendelsestype = (person: PersonData) => {
  if (person.harMotebehovUbehandlet) {
    if (person.harMoteplanleggerUbehandlet) {
      return hendelsestypeString.motebehovMote;
    }
    return hendelsestypeString.motebehov;
  }
  if (person.harMoteplanleggerUbehandlet) {
    return hendelsestypeString.mote;
  }
  return hendelsestypeString.ingen;
};
