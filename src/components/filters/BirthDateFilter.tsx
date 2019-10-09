import React from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/src/types';
import FilterTittel from '../FilterTitle';

const allDates = new Array(31).fill(1).map((currentNumber, index) => currentNumber + index);

const texts = {
    title: 'Fødselsdato',
    placeholder: 'Velg datoer',
};

interface DateOption {
    value: string;
    label: string;
}

const selectableOptions: DateOption[] = allDates.map((v: number) => {
    const paddedValue = v.toString().padStart(2, '0');
    return { value: paddedValue, label: paddedValue };
});

interface BirthDateFilterProps {
    onSelect(value: string[]): void;
}

const BirthDateFilter = ({ onSelect }: BirthDateFilterProps) => {



    return (
        <div>
            <FilterTittel>{texts.title}</FilterTittel>
            <Select placeholder={texts.placeholder}  options={selectableOptions} isMulti closeMenuOnSelect={false} onChange={(v: ValueType<DateOption>) => {
                const arrayOfSelectedOptions = (v as DateOption[]) || [];
                const arrayOfStrings = arrayOfSelectedOptions.map((option) => option.value) || [];
                onSelect(arrayOfStrings);
            }} />
        </div>
    );
};

export default BirthDateFilter;
