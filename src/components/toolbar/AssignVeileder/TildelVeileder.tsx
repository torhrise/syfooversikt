import * as React from 'react';
import {
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { ToolbarProps } from '../Toolbar';
import { AssignToCurrentVeilederButton } from './AssignToCurrentVeilederButton';
import { Flatknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import {
  assignUsersToSelectedVeileder,
  filterVeiledereOnInput,
  hasNoCheckedPersoner,
} from '../../../utils/assignVeilederUtils';
import { ConfirmVeilederButton } from './ConfirmVeilederButton';
import {
  removeCurrentVeilederFromVeiledere,
  sortVeiledereAlphabeticallyBySurname,
} from '../../../utils/veiledereUtils';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import { VeilederRadioButtons } from './VeilederRadioButtons';
import { OverviewTabType } from '../../../konstanter';

interface StateProps {
  chosenVeilederIdent: string;
  input: string;
  showList: boolean;
  veiledere: Veileder[];
  veilederIsChosen: boolean;
  currentTabType: OverviewTabType;
}

const texts = {
  assignOtherVeileder: 'Tildel veileder',
};

export const FlatButton = styled(Flatknapp)`
  margin-left: 2em;
  padding: 0;
`;

const RadioPanelGroup = styled.div`
  border: 0;
  overflow: auto;
  height: 20em;
  width: inherit;
`;

const ButtonPanel = styled.section`
  position: fixed;
  background: white;
  width: auto;
  height: auto;
  transform: translate(20%, 5%);
  z-index: 1;
  opacity: 50%
`;

const TildelVeileder = (props: ToolbarProps) => {
  const initialState = {
    chosenVeilederIdent: '',
    input: '',
    showList: false,
    currentTabType: props.tabType,
    veiledere: props.veiledere,
    veilederIsChosen: false,
  };
  const [state, setState] = useState<StateProps>(initialState);

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
        currentTabType: props.tabType,
        showList: false,
      });
  }, [props.tabType !== state.currentTabType]);

  const radiobuttonOnChangeHandler = (veileder: Veileder) => {
    setState({
      ...state,
      chosenVeilederIdent: veileder.ident,
      veilederIsChosen: true,
    });
  };

  const confirmVeilederButtonHandler = (chosenVeilederIdent: string) => {
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
  const veiledereWithoutCurrentVeileder = removeCurrentVeilederFromVeiledere(props.veiledere, props.aktivVeilederInfo.ident);
  const veiledereSortedAlphabetically = sortVeiledereAlphabeticallyBySurname(veiledereWithoutCurrentVeileder);
  const filteredVeiledere = filterVeiledereOnInput(veiledereSortedAlphabetically, lowerCaseInput);

  return (<>
    <FlatButton onClick={() => setState({ ...state, showList: !state.showList })}
                disabled={hasNoCheckedPersoner(props.markertePersoner)}>{texts.assignOtherVeileder}</FlatButton>
    {state.showList && <ButtonPanel>
      <Input label="" value={state.input} type="text" onChange={(event) => onChangeHandler(event)} />
      <RadioPanelGroup>
        <VeilederRadioButtons
          onChangeHandler={radiobuttonOnChangeHandler}
          filteredVeiledere={filteredVeiledere}
        />
      </RadioPanelGroup>
      <ConfirmVeilederButton
        chosenVeilederIdent={state.chosenVeilederIdent}
        confirmVeilederButtonHandler={confirmVeilederButtonHandler}
        veilederIsChosen={state.veilederIsChosen} />
    </ButtonPanel>}

    {props.tabType === OverviewTabType.ENHET_OVERVIEW && (
      <AssignToCurrentVeilederButton
        aktivVeilederIdent={props.aktivVeilederInfo.ident}
        confirmVeilederButtonHandler={confirmVeilederButtonHandler}
        disabled={hasNoCheckedPersoner(props.markertePersoner)}
    />
    )}
  </>);
};

export default TildelVeileder;
