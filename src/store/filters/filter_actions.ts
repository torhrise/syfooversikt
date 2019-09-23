export enum FilterActionTypes {
    UPDATE_BIRTH_DATE = 'UPDATE_BIRTH_DATE',
}

interface UpdateBirthdateFilter {
    type: FilterActionTypes.UPDATE_BIRTH_DATE;
    selectedBirthdates: string[];
}

export type FilterAction =
    UpdateBirthdateFilter;

export const updateBirthdateFilter = (birthDates: string[]) => ({
    type: FilterActionTypes.UPDATE_BIRTH_DATE,
    selectedBirthdates: birthDates,
}) as UpdateBirthdateFilter;
