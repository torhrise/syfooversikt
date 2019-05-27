import { Reducer } from 'redux';
import { EnhetensMoterState } from './enhetensMoterTypes';
import { EnhetensMoterActionTypes } from './enhetensMoter_actions';

const initiellState: EnhetensMoterState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: [],
};

const enhetensMoterReducer: Reducer<EnhetensMoterState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTER: {
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case EnhetensMoterActionTypes.HENT_ENHETENS_MOTER_FEILET: {
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

export default enhetensMoterReducer;
