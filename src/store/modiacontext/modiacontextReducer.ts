import { Reducer } from 'redux';
import {
  modiacontextActionTypes,
  ModiacontextState,
} from './modiacontextTypes';

const initiellState: ModiacontextState = {
  pushet: false,
  pusher: false,
  pushingFeilet: false,
  henterEnhet: false,
  hentingEnhetFeilet: false,
  data: {},
};

const modiacontextReducer: Reducer<ModiacontextState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case modiacontextActionTypes.PUSH_MODIACONTEXT_FEILET: {
      return Object.assign({}, state, {
        pushet: false,
        pusher: false,
        pushingFeilet: true,
      });
    }
    case modiacontextActionTypes.PUSHER_MODIACONTEXT: {
      return Object.assign({}, state, {
        pushet: false,
        pusher: true,
        pushingFeilet: false,
      });
    }
    case modiacontextActionTypes.MODIACONTEXT_PUSHET: {
      return Object.assign({}, state, {
        pushet: true,
        pusher: false,
        pushingFeilet: false,
      });
    }
    case modiacontextActionTypes.HENT_AKTIVENHET_FEILET: {
      return Object.assign({}, state, {
        henterEnhet: false,
        hentingEnhetFeilet: true,
      });
    }
    case modiacontextActionTypes.HENTER_AKTIVENHET: {
      return Object.assign({}, state, {
        henterEnhet: true,
        hentingEnhetFeilet: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default modiacontextReducer;
