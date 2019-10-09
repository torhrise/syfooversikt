import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import { FilterState } from '../../store/filters/filterReducer';
import { allFilterActionsWithEmptyValues } from '../../store/filters/filter_actions';
import { Knapp } from 'nav-frontend-knapper';

interface FilterOption {
    type: 'veileder' | 'company' | 'birth_date';
    value: string;
}

const filterStateToOptions = (filterState: FilterState) => {
    const filterOptions: FilterOption[] = [];
};

export default () => {

    const filterState = useSelector((state: ApplicationState) => state.filters);
    const dispatch = useDispatch();

    const clearAllFilters = () => {
        const allActions = allFilterActionsWithEmptyValues().forEach(dispatch);
    };

    return (
        <div>
            <Knapp onClick={clearAllFilters}>Tøm alle</Knapp>
        </div>
    );
};
