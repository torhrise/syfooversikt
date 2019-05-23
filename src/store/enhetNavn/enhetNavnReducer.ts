import { Reducer } from 'redux';
import {
  EnhetNavnActionTypes,
  EnhetNavnState,
} from './enhetNavnTypes';

const initiellState: EnhetNavnState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: [],
};

const enhetNavnReducer: Reducer<EnhetNavnState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTER: {
      return { ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case EnhetNavnActionTypes.HENT_ENHET_NAVN_HENTET: {
      return { ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case EnhetNavnActionTypes.HENT_ENHET_NAVN_FEILET: {
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

export default enhetNavnReducer;
