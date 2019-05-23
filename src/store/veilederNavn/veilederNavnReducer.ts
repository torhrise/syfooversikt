import { Reducer } from 'redux';
import {
  VeilederNavnActionTypes,
  VeilederNavnState,
} from './veilederNavnTypes';

const initiellState: VeilederNavnState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: {},
};

const veilederNavnReducer: Reducer<VeilederNavnState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTER: {
      return { ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case VeilederNavnActionTypes.HENT_VEILEDER_NAVN_HENTET: {
      const nyttVeilederNavn = { [action.data.id]: action.data };
      global.console.log ({
        ...state,
        henter: false,
        hentet: true,
        data: {...state.data, ...nyttVeilederNavn},
      });
      return {
        ...state,
        henter: false,
        hentet: true,
        data: {...state.data, ...nyttVeilederNavn},
      };
    }
    case VeilederNavnActionTypes.HENT_VEILEDER_NAVN_FEILET: {
      return { ...state,
        henter: false,
        hentingFeilet: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default veilederNavnReducer;
