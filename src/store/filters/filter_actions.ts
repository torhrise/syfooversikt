export enum FilterActionTypes {
    UPDATE_BIRTH_DATE = 'UPDATE_BIRTH_DATE',
    UPDATE_VEILDERER_IDENTS = 'UPDATE_VEILEDER_IDENTS',
    UPDATE_COMPANIES = 'UPDATE_COMPANIES',
}

interface UpdateBirthDateFilter {
    type: FilterActionTypes.UPDATE_BIRTH_DATE;
    selectedBirthDates: string[];
}

interface UpdateVeilederIdentsFilter {
    type: FilterActionTypes.UPDATE_VEILDERER_IDENTS;
    selectedVeilederIdents: string[];
}

export type FilterAction =
    UpdateBirthDateFilter | UpdateVeilederIdentsFilter;
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

export const updateVeilederIdentsFilter = (veilederIdents: string[]) => ({
    type: FilterActionTypes.UPDATE_VEILDERER_IDENTS,
    selectedVeilederIdents: veilederIdents,
}) as UpdateVeilederIdentsFilter;
export const updateCompaniesFilter = (companies: string[]) => ({
    type: FilterActionTypes.UPDATE_COMPANIES,
    selectedCompanies: companies,
}) as UpdateCompaniesFilter;
