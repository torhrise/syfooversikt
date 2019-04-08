import { EnhetensMotebehovActionTypes, MotebehovSvar } from '../enhetensMotebehov/enhetensMotebehovTypes';
import { PersonNavnActionTypes, PersonNavn } from '../personNavn/personNavnTypes';
import { PersonData, PersonregisterState } from './personregisterTypes';
import { Reducer } from 'redux';

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
  }
  return state;
};

export default personregisterReducer;
