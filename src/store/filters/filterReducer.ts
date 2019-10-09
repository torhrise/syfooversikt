import { Reducer } from 'redux';
import { FilterActionTypes, FilterAction } from './filter_actions';

export const FILTERS_STATE_KEY = 'Filters';

export interface FilterState {
    selectedBirthDates: string[];
    selectedVeilederIdents: string[];
    selectedCompanies: string[];
}

const inititalState: FilterState = {
    selectedBirthDates: [],
    selectedVeilederIdents: [],
    selectedCompanies: [],
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
            }
        }
        case FilterActionTypes.UPDATE_COMPANIES: {
            return {
                ...state,
                selectedCompanies: action.selectedCompanies,
            };
        }
    return state;
};

export default FilterReducer;
