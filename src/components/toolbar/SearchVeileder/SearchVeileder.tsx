import React, { ChangeEvent, useState } from 'react';
import OpenDropdownButton from './OpenDropdownButton';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import styled from 'styled-components';
import { Dropdown } from './Dropdown';
import { sortVeiledereAlphabeticallyWithGivenVeilederFirst } from '../../../utils/veiledereUtils';
import { filterVeiledereOnInput } from '../../../utils/assignVeilederUtils';
import { Veilederinfo } from '../../../store/veilederinfo/veilederinfoTypes';

interface VeilederIdentsFilterProps {
    aktivVeilederInfo: Veilederinfo;
    veiledere: Veileder[];

    onSelect(value: string[]): void;
}

interface VeilederIdentOption {
    value: string;
    label: string;
}

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SearchVeileder = (props: VeilederIdentsFilterProps) => {
    const [showList, setShowList] = useState(false);
    const [input, setInput] = useState('');
    const [veileders, setVeileders] = useState<Veileder[]>([]);
    const toggleShowList = () => {
        setShowList(!showList);
    };

    const cancelButtonHandler = () => {
        setShowList(false);
    };

    const inputChangeHandler = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setInput(target.value);
    };

    const lowerCaseInput = input.toLowerCase();
    const veiledereSortedAlphabetically = sortVeiledereAlphabeticallyWithGivenVeilederFirst(
        props.veiledere,
        props.aktivVeilederInfo.ident
    );
    const filteredVeiledere = filterVeiledereOnInput(
        veiledereSortedAlphabetically,
        lowerCaseInput
    );

    const checkboxOnChangeHandler = (veileder: Veileder) => {
        if (veileders.find((v: Veileder) => v.ident === veileder.ident)) {
            setVeileders(veileders.filter((v) => v.ident !== veileder.ident));
        } else {
            setVeileders([...veileders, veileder]);
        }
    };

    const chooseButtonHandler = () => {
        props.onSelect(veileders.map((v) => v.ident));
    };
    const onBlur = (e: any) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setShowList(false);
                setInput('');
            }
        }, 0);
    };

    return (
        <div tabIndex={1} style={{padding: 0}} onBlur={onBlur}>
            <ButtonDiv>
                <OpenDropdownButton
                    text={'Søk veileder'}
                    showList={showList}
                    userIsChecked={true}
                    onClick={toggleShowList}
                />
            </ButtonDiv>
            {showList && (
                <Dropdown
                    radiobuttonChangeHandler={checkboxOnChangeHandler}
                    cancelButtonHandler={cancelButtonHandler}
                    chooseButtonHandler={chooseButtonHandler}
                    filteredVeiledere={filteredVeiledere}
                    selectedVeileders={veileders}
                    input={input}
                    inputChangeHandler={inputChangeHandler}
                    chosenVeilederIdent={''}
                    veilederIsChosen={true}
                />
            )}
        </div>
    );
};

export default SearchVeileder;
