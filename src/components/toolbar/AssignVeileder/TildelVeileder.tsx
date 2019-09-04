import * as React from 'react';
import {
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { ToolbarProps } from '../Toolbar';
import {
  assignUsersToSelectedVeileder,
  filterVeiledereOnInput,
  hasNoCheckedPersoner,
  isInputGiven,
} from '../../../utils/assignVeilederUtils';
import { ConfirmVeilederButtons } from './ConfirmVeilederButtons';
import { sortVeiledereAlphabeticallyWithGivenVeilederFirst } from '../../../utils/veiledereUtils';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import { VeilederRadioButtons } from './VeilederRadioButtons';
import AssignToVeilederButton from './AssignToVeilederButton';
import InputWithSearchIcon from '../../InputWithSearchIcon';

interface StateProps {
  chosenVeilederIdent: string;
  input: string;
  showList: boolean;
  veiledere: Veileder[];
  veilederIsChosen: boolean;
}

const RadioPanelGroup = styled.div`
  margin: .5em;
  border: 0;
  overflow: auto;
  height: 20em;
  width: calc(100% - .5em);
`;

const ButtonPanel = styled.section`
  border: 1px solid gray;
  border-top: 0;
  position: absolute;
  background: white;
  width: 20em;
  height: auto;
  transform: translate(32.3%, 12%);
  z-index: 1;
`;

const TildelVeileder = (props: ToolbarProps) => {

  const stateFromProps = () => ({
    chosenVeilederIdent: '',
    input: '',
    showList: false,
    veiledere: props.veiledere,
    veilederIsChosen: false,
  });

  const [state, setState] = useState<StateProps>(stateFromProps());

  useEffect(() => {
    if (hasNoCheckedPersoner(props.markertePersoner)) {
      setState({
        ...state,
        showList: false,
        veilederIsChosen: false,
        chosenVeilederIdent: '',
      });
    }
  }, [props.markertePersoner]);

  const onChangeHandler = (event: ChangeEvent) => {
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

  const confirmVeilederCloseButtonHandler = () => {
    setState({
      ...state,
      chosenVeilederIdent: '',
      input: '',
      showList: false,
      veilederIsChosen: false,
    });
  };

  const confirmVeilederChooseButtonHandler = (chosenVeilederIdent: string) => {
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

  const lowerCaseInput = state.input.toLowerCase();
  const veiledereSortedAlphabetically = sortVeiledereAlphabeticallyWithGivenVeilederFirst(props.veiledere, props.aktivVeilederInfo.ident);
  const filteredVeiledere = filterVeiledereOnInput(veiledereSortedAlphabetically, lowerCaseInput);

  return (<>
    <AssignToVeilederButton
      onClick={assignToOtherVeilederButtonHandler}
      showList={state.showList}
      userIsChecked={!hasNoCheckedPersoner(props.markertePersoner)}
    />

    {state.showList && <ButtonPanel className="tildelVeileder__buttonPanel">
      <InputWithSearchIcon
        autofocus
        label=""
        onChange={onChangeHandler}
        placeholder={'Tildel veileder'}
        type={'text'}
        value={state.input}
      />
      <RadioPanelGroup className="radioPanelGroup">
        <VeilederRadioButtons
          onChangeHandler={radiobuttonOnChangeHandler}
          filteredVeiledere={filteredVeiledere}
          isInputGiven={isInputGiven(state.input)}
        />
      </RadioPanelGroup>

      <ConfirmVeilederButtons
        chosenVeilederIdent={state.chosenVeilederIdent}
        chooseButtonHandler={confirmVeilederChooseButtonHandler}
        closeButtonHandler={confirmVeilederCloseButtonHandler}
        veilederIsChosen={state.veilederIsChosen}
      />
    </ButtonPanel>}
  </>);
};

export default TildelVeileder;
