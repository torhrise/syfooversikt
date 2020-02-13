import { SortingType } from '../../utils/hendelseFilteringUtils';

export const enum SortingActionTypes {
    SORT_VEILEDERE = 'SORT_VEILEDERE',
}

export const sortVeiledere = (sortingType: SortingType) => {
    return ({
        type: SortingActionTypes.SORT_VEILEDERE,
        sortingType,
    });
};
