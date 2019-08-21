import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import styled from 'styled-components';
import { ToolbarProps } from '../Toolbar';
import { AssignToCurrentVeilederButton } from './AssignToCurrentVeilederButton';
import { Flatknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import {
  assignUsersToSelectedVeileder,
  filterVeiledereOnInput,
  hasNoCheckedPersoner,
  radiobuttonsFromFilteredVeilederList,
} from '../../../utils/assignVeilederUtils';
import { ConfirmVeilederButton } from './ConfirmVeilederButton';
import {
  removeCurrentVeilederFromVeiledere,
  sortVeiledereAlphabeticallyBySurname,
} from '../../../utils/veiledereUtils';
import { Veileder } from '../../../store/veiledere/veiledereTypes';

interface StateProps {
  chosenVeilederIdent: string;
  input: string;
  showList: boolean;
  veiledere: Veileder[];
  veilederIsChosen: boolean;
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
  transform: translate(20%, 0);
  z-index: 1;
  opacity: 50%
`;

class TildelVeileder extends Component<ToolbarProps, StateProps> {
  constructor(props: ToolbarProps) {
    super(props);
    this.state = {
      chosenVeilederIdent: '',
      input: '',
      showList: false,
      veiledere: props.veiledere,
      veilederIsChosen: false,
    };
    this.confirmVeilederButtonHandler = this.confirmVeilederButtonHandler.bind(this);
    this.radiobuttonOnChangeHandler = this.radiobuttonOnChangeHandler.bind(this);
  }

  onChangeHandler(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    this.setState({
      input: target.value,
    });
  }

  radiobuttonOnChangeHandler(veileder: Veileder) {
    this.setState(
      {
        chosenVeilederIdent: veileder.ident,
        veilederIsChosen: true,
      });
  }

  confirmVeilederButtonHandler(chosenVeilederIdent: string) {
    if (chosenVeilederIdent && chosenVeilederIdent.length > 0) {
      assignUsersToSelectedVeileder(this.props, chosenVeilederIdent);
    }
    this.setState(
      {
        showList: false,
        veilederIsChosen: false,
        chosenVeilederIdent: '',
      });
  }

  render() {
    const {
      chosenVeilederIdent,
      input,
      showList,
      veiledere,
      veilederIsChosen,
    } = this.state;

    const {
      aktivVeilederInfo,
      markertePersoner,
    } = this.props;

    const lowerCaseInput = input.toLowerCase();
    const veiledereWithoutCurrentVeileder = removeCurrentVeilederFromVeiledere(veiledere, aktivVeilederInfo.ident);
    const veiledereSortedAlphabetically = sortVeiledereAlphabeticallyBySurname(veiledereWithoutCurrentVeileder);
    const filteredVeiledere = filterVeiledereOnInput(veiledereSortedAlphabetically, lowerCaseInput);
    const veilederRadioButtons = radiobuttonsFromFilteredVeilederList(this.radiobuttonOnChangeHandler, filteredVeiledere);

    return (<>
      <FlatButton onClick={() => this.setState({ showList: !showList })}
                  disabled={hasNoCheckedPersoner(markertePersoner)}>{texts.assignOtherVeileder}</FlatButton>
      {showList && <ButtonPanel>
        <Input label="" value={input} type="text" onChange={(event) => this.onChangeHandler(event)}/>
        <RadioPanelGroup>{veilederRadioButtons}</RadioPanelGroup>
        <ConfirmVeilederButton
          chosenVeilederIdent={chosenVeilederIdent}
          confirmVeilederButtonHandler={this.confirmVeilederButtonHandler}
          veilederIsChosen={veilederIsChosen}/>
      </ButtonPanel>}
      <AssignToCurrentVeilederButton
        aktivVeilederIdent={aktivVeilederInfo.ident}
        confirmVeilederButtonHandler={this.confirmVeilederButtonHandler}
        disabled={hasNoCheckedPersoner(markertePersoner)}
      />
    </>);
  }
}

export default TildelVeileder;
