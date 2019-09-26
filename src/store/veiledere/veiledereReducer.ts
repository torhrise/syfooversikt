import { Reducer } from 'redux';
import { VeiledereState } from './veiledereTypes';
import { VeiledereActionTypes } from './veiledere_actions';
import { modiacontextActionTypes } from '../modiacontext/modiacontext_actions';
import { CONTEXT_EVENT_TYPE } from '../../konstanter';

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
    case modiacontextActionTypes.PUSH_MODIACONTEXT_PUSHET: {
      if (action.data.eventType.valueOf() === CONTEXT_EVENT_TYPE.NY_AKTIV_ENHET) {
        return {
          hentet: false,
          henter: false,
          hentingFeilet: false,
          data: [],
        };
      }
    }
    default: {
      return state;
    }
  }
};

export default veiledereReducer;
