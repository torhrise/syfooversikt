export enum FilterActionTypes {
    UPDATE_BIRTH_DATE = 'UPDATE_BIRTH_DATE',
    UPDATE_COMPANIES = 'UPDATE_COMPANIES',
}

interface UpdateBirthDateFilter {
    type: FilterActionTypes.UPDATE_BIRTH_DATE;
    selectedBirthDates: string[];
}

interface UpdateCompaniesFilter {
    type: FilterActionTypes.UPDATE_COMPANIES;
    selectedCompanies: string[];
}

export type FilterAction =
    UpdateBirthDateFilter
    | UpdateCompaniesFilter;

export const updateBirthDateFilter = (birthDates: string[]) => ({
    type: FilterActionTypes.UPDATE_BIRTH_DATE,
    selectedBirthDates: birthDates,
}) as UpdateBirthDateFilter;

export const updateCompaniesFilter = (companies: string[]) => ({
    type: FilterActionTypes.UPDATE_COMPANIES,
    selectedCompanies: companies,
}) as UpdateCompaniesFilter;
