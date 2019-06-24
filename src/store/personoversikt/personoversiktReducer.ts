import { Reducer } from 'redux';
import { PersonoversiktStatusState } from './personoversiktTypes';
import { PersonoversiktActionTypes } from './personoversikt_actions';

const initiellState: PersonoversiktStatusState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: [],
};

const personoversiktReducer: Reducer<PersonoversiktStatusState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTER: {
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case PersonoversiktActionTypes.HENT_PERSONOVERSIKT_ENHET_FEILET: {
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

export default personoversiktReducer;
