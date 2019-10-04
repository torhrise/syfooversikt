import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import InputWithSearchIcon from '../../InputWithSearchIcon';
import { VeiledereCheckboxes } from './VeiledereCheckboxes';
import { isInputGiven } from '../../../utils/assignVeilederUtils';
import { DropdownButtons } from './DropdownButtons';
import { Veileder } from '../../../store/veiledere/veiledereTypes';

interface DropdownProps {
    cancelButtonHandler: () => void;
    chooseButtonHandler: (chosenVeilederIdent: string) => void;
    chosenVeilederIdent: string;
    filteredVeiledere: Veileder[];
    input: string;
    inputChangeHandler: (event: ChangeEvent) => void;
    radiobuttonChangeHandler: (veileder: Veileder) => void;
    veilederIsChosen: boolean;
    selectedVeileders: Veileder[];
}

const RadioPanelGroup = styled.div`
  margin: .5em;
  border: 0;
  overflow: auto;
  height: 20em;
  width: calc(100% - .5em);
`;

const DropdownPanel = styled.section`
  padding: 0 !important;
  border: 1px solid gray;
  position: absolute;
  background: white;
  width: 25em;
  height: auto;
  z-index: 1;
`;

export const Dropdown = (props: DropdownProps) => {
    const {
        cancelButtonHandler,
        chooseButtonHandler,
        chosenVeilederIdent,
        filteredVeiledere,
        input,
        inputChangeHandler,
        radiobuttonChangeHandler,
        veilederIsChosen,
        selectedVeileders,
    } = props;

    return (<DropdownPanel className="tildelVeileder__dropdownPanel">
        <InputWithSearchIcon
            autofocus
            label=""
            onChange={inputChangeHandler}
            placeholder={'Søk veileder'}
            type={'text'}
            value={input}
        />

        <RadioPanelGroup className="radioPanelGroup">
            <VeiledereCheckboxes
                onChangeHandler={radiobuttonChangeHandler}
                filteredVeiledere={filteredVeiledere}
                selectedVeileders={selectedVeileders}
                isInputGiven={isInputGiven(input)}
            />
        </RadioPanelGroup>

        <DropdownButtons
            cancelButtonHandler={cancelButtonHandler}
            chosenVeilederIdent={chosenVeilederIdent}
            chooseButtonHandler={chooseButtonHandler}
            veilederIsChosen={veilederIsChosen}
        />
    </DropdownPanel>);
};
