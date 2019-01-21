import { Reducer } from 'redux';
import {
  VeilederinfoActiontypes,
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
    case VeilederinfoActiontypes.HENTER_VEILEDERINFO: {
      return Object.assign({}, state, {
        henter: true,
        hentet: false,
        hentingFeilet: false,
      });
    }
    case VeilederinfoActiontypes.VEILEDERINFO_HENTET: {
      return Object.assign({}, state, {
        henter: false,
        hentet: true,
        data: action.data,
      });
    }
    case VeilederinfoActiontypes.HENT_VEILEDERINFO_FEILET: {
      return Object.assign({}, state, {
        henter: false,
        hentingFeilet: true,
      });
    }
    default: {
      return state;
    }
  }
};

export default veilederinfoReducer;
