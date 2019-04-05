import {EnhetensMotebehovActionTypes, MotebehovSvar} from '../enhetensMotebehov/enhetensMotebehovTypes';
import {PersonNavnActionTypes, PersonNavn} from '../personNavn/personNavnTypes';
import {Person, PersonregisterState} from './personregisterTypes';
import { Reducer } from 'redux';

const initiellState = {
  ['99999911111']: {navn: 'Egil Åsen', harSvartPaaMotebehov: false, skjermingskode: 'EGEN_ANSATT'},
  ['99999922222']: {navn: 'August Bertil Svendsen', harSvartPaaMotebehov: true, skjermingskode: 'INGEN'}};

const printNyGammelState = (state: PersonregisterState, nyState: PersonregisterState) => {
  global.console.log('GAMMEL: ', state);
  global.console.log('NY: ', nyState);
};

const personregisterReducer: Reducer<PersonregisterState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET: {
      const motebehovPaaPersoner = action.data;
      const personerSomSkalOppdateres: { [fnr: string]: Person } = motebehovPaaPersoner.map((motebehovSvar: MotebehovSvar) => {
        return {
          [motebehovSvar.fnr]: {
            ...state[motebehovSvar.fnr],
            harSvartPaaMotebehov: true,
            skjermingskode: motebehovSvar.skjermingskode
          }
        };
      }).reduce((acc: { }, curr: { [fnr: string]: Person}) => {
        return {...acc, ...curr};
      }, { });
      printNyGammelState(state, {...state, ...personerSomSkalOppdateres });
      return {...state, ...personerSomSkalOppdateres };
    }
    case PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET: {
      const navnHentet = action.data;
      const personerSomSkalOppdateres: { [fnr: string]: Person } = navnHentet.map((personNavn: PersonNavn) => {
        return {
          [personNavn.fnr]: {
            ...state[personNavn.fnr],
            navn: personNavn.navn
          }
        };
      }).reduce((acc: { }, curr: { [fnr: string]: Person}) => {
        return {...acc, ...curr};
      }, { });
      printNyGammelState(state, {...state, ...personerSomSkalOppdateres });
      return {...state, ...personerSomSkalOppdateres };
    }
  }
  return state;
};

export default personregisterReducer;
