import { Reducer } from 'redux';
import {
  VeilederinfoActionTypes,
  VeilederinfoState,
} from './veilederinfoTypes';

const initiellState: VeilederinfoState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: { ident: '' },
};

const veilederinfoReducer: Reducer<VeilederinfoState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case VeilederinfoActionTypes.HENTER_VEILEDERINFO: {
      return { ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
      };
    }
    case VeilederinfoActionTypes.VEILEDERINFO_HENTET: {
      return { ...state,
        henter: false,
        hentet: true,
        data: action.data,
      };
    }
    case VeilederinfoActionTypes.HENT_VEILEDERINFO_FEILET: {
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

export default veilederinfoReducer;