import { Reducer } from 'redux';
import { VeilederenheterState } from './veilederenheterTypes';
import { VeilederenheterActionTypes } from './veilederenheter_actions';

const initiellState: VeilederenheterState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: { enhetliste: [] },
};

const veilederenheterReducer: Reducer<VeilederenheterState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTER: {
      return { ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case VeilederenheterActionTypes.HENT_VEILEDERENHETER_HENTET: {
      return { ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case VeilederenheterActionTypes.HENT_VEILEDERENHETER_FEILET: {
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

export default veilederenheterReducer;
