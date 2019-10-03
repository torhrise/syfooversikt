import { Reducer } from 'redux';
import { FilterActionTypes, FilterAction } from './filter_actions';

export const FILTERS_STATE_KEY = 'Filters';

export interface FilterState {
    selectedBirthDates: string[];
    selectedVeilederIdents: string[];
}

const inititalState: FilterState = {
    selectedBirthDates: [],
    selectedVeilederIdents: [],
};

const FilterReducer: Reducer<FilterState, FilterAction> = (state = inititalState, action) => {
    switch (action.type) {
        case FilterActionTypes.UPDATE_BIRTH_DATE: {
            return {
                ...state,
                selectedBirthDates: action.selectedBirthDates,
            };
        }

        case FilterActionTypes.UPDATE_VEILDERER_IDENTS: {
            return {
                ...state,
                selectedVeilederIdents: action.selectedVeilederIdents,
            };
        }
    }
    return state;
};

export default FilterReducer;
