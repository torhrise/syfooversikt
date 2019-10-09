import React, { useState } from 'react';
import Select from 'react-select';
import FilterTitle from '../FilterTitle';
import { ValueType } from 'react-select/src/types';

const texts = {
    title: 'Virksomheter',
    placeholder: 'Velg virkomheter',
};

interface CompanyOption {
    value: string;
    label: string;
}

interface CompantyFilterProps {
    options: string[];
    onSelect(arrayOfCompanies: string[]): void;
}

const CompanyFilter = (props: CompantyFilterProps) => {

    const companyNamesAsOption = props.options.map((s) => ({ label: s, value: s } as CompanyOption));

    return (
        <div>
            <FilterTitle>{texts.title}</FilterTitle>
            <Select isDisabled={companyNamesAsOption.length === 0} isMulti placeholder={texts.placeholder} options={companyNamesAsOption} closeMenuOnSelect={false} onChange={(v: ValueType<CompanyOption>) => {
                const arrayOfSelectedOptions = (v as CompanyOption[]) || [];
                const arrayOfStrings = arrayOfSelectedOptions.map((option) => option.value) || [];
                props.onSelect(arrayOfStrings);
            }}/>
        </div>
    );
};

export default CompanyFilter;
