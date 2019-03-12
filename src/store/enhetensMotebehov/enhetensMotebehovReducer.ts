import { Reducer } from 'redux';
import {
  EnhetensMotebehovActionTypes,
  EnhetensMotebehovState,
} from './enhetensMotebehovTypes';

const initiellState: EnhetensMotebehovState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: [],
};

const enhetensMotebehovReducer: Reducer<EnhetensMotebehovState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case EnhetensMotebehovActionTypes.HENTER_ENHETENS_MOTEBEHOV: {
      return { ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case EnhetensMotebehovActionTypes.ENHETENS_MOTEBEHOV_HENTET: {
      return { ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_FEILET: {
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

export default enhetensMotebehovReducer;
