export enum FilterActionTypes {
    UPDATE_BIRTH_DATE = 'UPDATE_BIRTH_DATE',
}

interface UpdateBirthDateFilter {
    type: FilterActionTypes.UPDATE_BIRTH_DATE;
    selectedBirthDates: string[];
}

export type FilterAction =
    UpdateBirthDateFilter;

export const updateBirthDateFilter = (birthDates: string[]) => ({
    type: FilterActionTypes.UPDATE_BIRTH_DATE,
    selectedBirthDates: birthDates,
}) as UpdateBirthDateFilter;
