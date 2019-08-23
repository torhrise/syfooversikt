import { Reducer } from 'redux';
import { VeiledereState } from './veiledereTypes';
import { VeiledereActionTypes } from './veiledere_actions';

const initiellState: VeiledereState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: [],
};

const veiledereReducer: Reducer<VeiledereState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case VeiledereActionTypes.HENT_VEILEDERE_HENTER: {
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case VeiledereActionTypes.HENT_VEILEDERE_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case VeiledereActionTypes.HENT_VEILEDERE_FEILET: {
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

export default veiledereReducer;
