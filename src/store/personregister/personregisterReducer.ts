import { Reducer } from 'redux';
import { EnhetensMotebehovActionTypes } from '../enhetensMotebehov/enhetensMotebehov_actions';
import { PersonNavn } from '../personNavn/personNavnTypes';
import { PersonNavnActionTypes } from '../personNavn/personNavn_actions';
import { PersonoversiktStatus } from '../personoversikt/personoversiktTypes';
import { PersonoversiktActionTypes } from '../personoversikt/personoversikt_actions';
import {
  PersonData,
  PersonregisterState,
  PersonHendelseData,
} from './personregisterTypes';
import { EnhetensMoterActionTypes } from '../enhetensMoter/enhetensMoter_actions';

const tilPersonDataMap = (personDataMapObject: any) => {
  return personDataMapObject.reduce((acc: { }, curr: { [fnr: string]: PersonData}) => {
    return {...acc, ...curr};
  }, { });
};

const initiellState = { };

const personregisterReducer: Reducer<PersonregisterState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET: {
      const motebehovSvarHentet = action.data;
      const personerSomSkalOppdateres: { [fnr: string]: PersonData } = motebehovSvarHentet.map((motebehovSvar: PersonHendelseData) => {
        return {
          [motebehovSvar.fnr]: {
            ...state[motebehovSvar.fnr],
            harSvartPaaMotebehov: true,
            skjermingskode: motebehovSvar.skjermingskode,
          },
        };
      });
      const oppdatering = tilPersonDataMap(personerSomSkalOppdateres);
      return {...state, ...oppdatering };
    }
    case EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTET: {
      const moterSvarHentet = action.data;
      const personerSomSkalOppdateres: { [fnr: string]: PersonData } = moterSvarHentet.map((moter: PersonHendelseData) => {
        return {
          [moter.fnr]: {
            ...state[moter.fnr],
            harMote: true,
            skjermingskode: moter.skjermingskode,
          },
        };
      });
      const oppdatering = tilPersonDataMap(personerSomSkalOppdateres);
      return {...state, ...oppdatering };
    }
    case PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET: {
      const navnHentet = action.data;
      const personerSomSkalOppdateres: { [fnr: string]: PersonData } = navnHentet.map((personNavn: PersonNavn) => {
        return {
          [personNavn.fnr]: {
            ...state[personNavn.fnr],
            navn: personNavn.navn,
          },
        };
      });
      const oppdatering = tilPersonDataMap(personerSomSkalOppdateres);
      return {...state, ...oppdatering };
    }
    case PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTET: {
      const personoversikt = action.data;
      const personerSomSkalOppdateres = personoversikt.map((person: PersonoversiktStatus) => {
        return {
          [person.fnr]: {
            ...state[person.fnr],
            tildeltEnhetId: person.enhet,
            tildeltVeilederIdent: person.veilederIdent,
          },
        };
      });
      const oppdatering = tilPersonDataMap(personerSomSkalOppdateres);
      return {...state, ...oppdatering };
    }
  }
  return state;
};

export default personregisterReducer;
