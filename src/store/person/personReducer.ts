import { EnhetensMotebehovActionTypes } from '../enhetensMotebehov/enhetensMotebehovTypes';
import {Person, PersonState} from './personTypes';
import {Reducer} from 'redux';
import {number} from 'prop-types';

const initiellState: PersonState =  {
  hentet: false,
  henter: false,
  hentingFeilet: false,
  data: {}
};

const personReducer: Reducer<PersonState> = (
  state = initiellState,
  action
) => {
  switch (action.type) {
    case EnhetensMotebehovActionTypes.HENT_ENHETENS_MOTEBEHOV_HENTET: {
      const personMap = state.data;
      return {...state};
    }
  }
  return state;
};
