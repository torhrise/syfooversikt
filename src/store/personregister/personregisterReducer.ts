import { Reducer } from 'redux';
import {
  EnhetensMotebehovActionTypes,
  MotebehovSvar,
} from '../enhetensMotebehov/enhetensMotebehovTypes';
import {
  PersonNavnActionTypes,
  PersonNavn,
} from '../personNavn/personNavnTypes';
import {
  PersonregisterActionTypes,
  PersonData,
  PersonregisterState,
} from './personregisterTypes';

const initiellState = { };

const personregisterReducer: Reducer<PersonregisterState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET: {
      const motebehovSvarHentet = action.data;
      const personerSomSkalOppdateres: { [fnr: string]: PersonData } = motebehovSvarHentet.map((motebehovSvar: MotebehovSvar) => {
        return {
          [motebehovSvar.fnr]: {
            ...state[motebehovSvar.fnr],
            harSvartPaaMotebehov: true,
            skjermingskode: motebehovSvar.skjermingskode
          }
        };
      }).reduce((acc: { }, curr: { [fnr: string]: PersonData}) => {
        return {...acc, ...curr};
      }, { });
      return {...state, ...personerSomSkalOppdateres };
    }
    case PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET: {
      const navnHentet = action.data;
      const personerSomSkalOppdateres: { [fnr: string]: PersonData } = navnHentet.map((personNavn: PersonNavn) => {
        return {
          [personNavn.fnr]: {
            ...state[personNavn.fnr],
            navn: personNavn.navn
          }
        };
      }).reduce((acc: { }, curr: { [fnr: string]: PersonData}) => {
        return {...acc, ...curr};
      }, { });
      return {...state, ...personerSomSkalOppdateres };
    }
    case PersonregisterActionTypes.TOGGLE_PERSON_MARKERT: {
      const personSomSkalToggles = action.fnr;
      const erMarkert = state[personSomSkalToggles].markert;
      return {
        ...state,
        [personSomSkalToggles]: {
          ...state[personSomSkalToggles],
          markert: !erMarkert
        }
      };
    }
    case PersonregisterActionTypes.TOGGLE_VELG_ALLE: {
      const skalMarkeres = action.kryssetAv;
      const allePersoner = Object.keys(state).map((fnr) => {
        return {
          [fnr]: {
            ...state[fnr],
            markert: skalMarkeres
          }
        };
      }).reduce((acc: { }, curr: { [fnr: string]: PersonData}) => {
        return {...acc, ...curr};
      }, { });
      return {
        ...state,
        ...allePersoner
      };
    }
  }
  return state;
};

export default personregisterReducer;
