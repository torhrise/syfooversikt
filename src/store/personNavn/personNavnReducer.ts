import { Reducer } from 'redux';
import { PersonNavnState } from './personNavnTypes';
import { PersonNavnActionTypes } from './personNavn_actions';

const initiellState: PersonNavnState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: [],
};

const personNavnReducer: Reducer<PersonNavnState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case PersonNavnActionTypes.HENT_PERSON_NAVN_HENTER: {
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case PersonNavnActionTypes.HENT_PERSON_NAVN_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case PersonNavnActionTypes.HENT_PERSON_NAVN_FEILET: {
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

export default personNavnReducer;
