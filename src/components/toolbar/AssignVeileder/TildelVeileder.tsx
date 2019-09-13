import React, {
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import { ToolbarProps } from '../Toolbar';
import {
  assignUsersToSelectedVeileder,
  filterVeiledereOnInput,
  hasNoCheckedPersoner,
} from '../../../utils/assignVeilederUtils';
import { sortVeiledereAlphabeticallyWithGivenVeilederFirst } from '../../../utils/veiledereUtils';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import OpenDropdownButton from './OpenDropdownButton';
import { Dropdown } from './Dropdown';

interface StateProps {
  chosenVeilederIdent: string;
  input: string;
  showList: boolean;
  veiledere: Veileder[];
  veilederIsChosen: boolean;
}

const TildelVeileder = (props: ToolbarProps) => {

  const stateFromProps = () => ({
    chosenVeilederIdent: '',
    input: '',
    showList: false,
    veiledere: props.veiledere,
    veilederIsChosen: false,
  });

  const [state, setState] = useState<StateProps>(stateFromProps());

  const inputChangeHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setState({
      ...state,
      input: target.value,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      showList: false,
    });
  }, [props.tabType]);

  const radiobuttonOnChangeHandler = (veileder: Veileder) => {
    setState({
      ...state,
      chosenVeilederIdent: veileder.ident,
      veilederIsChosen: true,
    });
  };

  const assignToOtherVeilederButtonHandler = () => {
    if (!hasNoCheckedPersoner(props.markertePersoner)) {
      if (state.showList) {
        setState({
          ...state,
          chosenVeilederIdent: '',
          input: '',
          showList: false,
          veilederIsChosen: false,
        });
      } else {
        setState({
          ...state,
          input: '',
          showList: !state.showList,
        });
      }
    }
  };

  const cancelButtonHandler = () => {
    setState({
      ...state,
      chosenVeilederIdent: '',
      input: '',
      showList: false,
      veilederIsChosen: false,
    });
  };

  const chooseButtonHandler = (chosenVeilederIdent: string) => {
    if (chosenVeilederIdent && chosenVeilederIdent.length > 0) {
      assignUsersToSelectedVeileder(props, chosenVeilederIdent);
    }

    setState({
      ...state,
      showList: false,
      veilederIsChosen: false,
      chosenVeilederIdent: '',
    });
  };

  const onBlur = (e: any) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setState({
          ...state,
          chosenVeilederIdent: '',
          input: '',
          showList: false,
          veilederIsChosen: false,
        });
      }
      }, 0);
  };

  const lowerCaseInput = state.input.toLowerCase();
  const veiledereSortedAlphabetically = sortVeiledereAlphabeticallyWithGivenVeilederFirst(props.veiledere, props.aktivVeilederInfo.ident);
  const filteredVeiledere = filterVeiledereOnInput(veiledereSortedAlphabetically, lowerCaseInput);

  return (<div tabIndex={1} onBlur={onBlur}>
    <OpenDropdownButton
      onClick={assignToOtherVeilederButtonHandler}
      showList={state.showList}
      userIsChecked={!hasNoCheckedPersoner(props.markertePersoner)}
    />

    {state.showList && <Dropdown
      cancelButtonHandler={cancelButtonHandler}
      chooseButtonHandler={chooseButtonHandler}
      chosenVeilederIdent={state.chosenVeilederIdent}
      filteredVeiledere={filteredVeiledere}
      input={state.input}
      inputChangeHandler={inputChangeHandler}
      radiobuttonChangeHandler={radiobuttonOnChangeHandler}
      veilederIsChosen={state.veilederIsChosen}
    />}
  </div>);
};

export default TildelVeileder;
