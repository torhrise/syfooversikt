import React, { ChangeEvent, useState } from 'react';
import OpenDropdownButton from '../OpenDropdownButton/OpenDropdownButton';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import styled from 'styled-components';
import { Dropdown } from '../Dropdown/Dropdown';
import { sortVeiledereAlphabeticallyWithGivenVeilederFirst } from '../../../utils/veiledereUtils';
import { filterVeiledereOnInput } from '../../../utils/assignVeilederUtils';
import { Veilederinfo } from '../../../store/veilederinfo/veilederinfoTypes';

interface VeilederIdentsFilterProps {
    aktivVeilederInfo: Veilederinfo;
    veiledere: Veileder[];

    onSelect(value: string[]): void;
}

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SearchVeileder = (props: VeilederIdentsFilterProps) => {
    const [showList, setShowList] = useState(false);
    const [input, setInput] = useState('');
    const [activeVeilederFilter, setActiveVeilederFilter] = useState<Veileder[]>([]);
    const [veileders, setVeileders] = useState<Veileder[]>(activeVeilederFilter);
    const [activeFilters, setActiveFilters] = useState(0);

    const toggleShowList = () => {
        setVeileders(activeVeilederFilter);
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
        setActiveFilters((veileders.length));
        setShowList(false);
        setActiveVeilederFilter(veileders);
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
    const SearchButtonWrapper = styled.div`
        padding: 0 !important;
    `;

    return (
        <SearchButtonWrapper tabIndex={1} onBlur={onBlur}>
            <ButtonDiv>
                <OpenDropdownButton
                    text={`Søk veileder (${activeFilters})`}
                    showList={showList}
                    userIsChecked={true}
                    onClick={toggleShowList}
                    search={true}
                />
            </ButtonDiv>
            {showList && (
                <Dropdown
                    buttonChangeHandler={checkboxOnChangeHandler}
                    cancelButtonHandler={cancelButtonHandler}
                    chooseButtonHandler={chooseButtonHandler}
                    filteredVeiledere={filteredVeiledere}
                    selectedVeileders={veileders}
                    placeholder={'Søk veileder'}
                    input={input}
                    inputChangeHandler={inputChangeHandler}
                    chosenVeilederIdent={''}
                    veilederIsChosen={true}
                    buttonType={'checkbox'}
                />
            )}
        </SearchButtonWrapper>
    );
};

export default SearchVeileder;
