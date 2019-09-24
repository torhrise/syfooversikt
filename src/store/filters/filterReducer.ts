import { Reducer } from 'redux';
import { FilterActionTypes, FilterAction } from './filter_actions';

export const FILTERS_STATE_KEY = 'Filters';

export interface FilterState {
    selectedBirthDates: string[];
}

const inititalState: FilterState = {
    selectedBirthDates: [],
};

const FilterReducer: Reducer<FilterState, FilterAction> = (state = inititalState, action) => {
    switch (action.type) {
        case FilterActionTypes.UPDATE_BIRTH_DATE: {
            return {
                ...state,
                selectedBirthDates: action.selectedBirthDates,
            };
        }
    }
    return state;
};

export default FilterReducer;
