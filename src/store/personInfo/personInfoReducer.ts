import { Reducer } from 'redux';
import { PersonInfoState } from './personInfoTypes';
import { PersonInfoActionTypes } from './personInfo_actions';

const initiellState: PersonInfoState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: [],
};

const personInfoReducer: Reducer<PersonInfoState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case PersonInfoActionTypes.HENT_PERSON_INFO_HENTER: {
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case PersonInfoActionTypes.HENT_PERSON_INFO_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case PersonInfoActionTypes.HENT_PERSON_INFO_FEILET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default personInfoReducer;
