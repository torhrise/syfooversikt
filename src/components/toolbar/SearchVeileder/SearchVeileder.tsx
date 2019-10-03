import React, { useState } from 'react';
import OpenDropdownButton from '../AssignVeileder/OpenDropdownButton';
import Select from 'react-select';
import { ToolbarProps } from '../Toolbar';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import { ValueType } from 'react-select/src/types';

interface VeilederIdentsFilterProps {
    veiledere: Veileder[];
    onSelect(value: string[]): void;
}

interface VeilederIdentOption {
    value: string;
    label: string;
}

const SearchVeileder = (props: VeilederIdentsFilterProps) => {
    const [showList, setShowList] = useState(false);

    const veiledere: VeilederIdentOption[] = props.veiledere.map( (veileder) => ({value: veileder.ident, label: `${veileder.fornavn}`}));

    const toggleShowList = () => {
        setShowList(!showList);
    };

    return (
        <div>
            <OpenDropdownButton text={'Søk veileder'} showList={true} userIsChecked={true} onClick={toggleShowList}/>
            {showList && <Select options={veiledere} isMulti onChange={(v: ValueType<VeilederIdentOption>) => {
                const arrayOfSelectedOptions = (v as VeilederIdentOption[]) || [];
                const arrayOfStrings = arrayOfSelectedOptions.map((option) => option.value) || [];
                props.onSelect(arrayOfStrings);
            }}/>}
        </div>);

};

export default SearchVeileder;
