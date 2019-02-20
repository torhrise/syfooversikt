import { Reducer } from 'redux';
import {
    VeilederMotebehovActionTypes,
    VeilederMotebehovState
} from './veilederMotebehovTypes';

const initiellState: VeilederMotebehovState = {
    hentet: false,
    henter: false,
    hentingFeilet: false,
    data: [],
};

const veilederMotebehovReducer: Reducer<VeilederMotebehovState> = (
    state = initiellState,
    action
) => {
    switch (action.type) {
        case VeilederMotebehovActionTypes.HENTER_VEILEDER_MOTEBEHOV: {
            return { ...state,
                henter: true,
                hentet: false,
                hentingFeilet: false,
            };
        }
        case VeilederMotebehovActionTypes.VEILEDER_MOTEBEHOV_HENTET: {
            return { ...state,
                henter: false,
                hentet: true,
                data: action.data,
            };
        }
        case VeilederMotebehovActionTypes.HENT_VEILEDER_MOTEBEHOV_FEILET: {
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

export default veilederMotebehovReducer;
