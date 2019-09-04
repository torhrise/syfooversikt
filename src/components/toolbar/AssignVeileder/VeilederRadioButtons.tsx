import styled from 'styled-components';
import { Radio } from 'nav-frontend-skjema';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import * as React from 'react';

interface VeilederRadioButtonsProps {
  onChangeHandler: (veileder: Veileder) => void;
  filteredVeiledere: Veileder[];
  isInputGiven: boolean;
}

const StyledRadio = styled(Radio)`
  width: calc(100% - 1em);
  margin-bottom: .5em;
`;

const LoggedInVeilederFirst = styled.div`
  & > *:first-child {
    padding-bottom: .5em;
    border-bottom: 1px dotted gray;
  }
`;

const RadioButtons = (props: VeilederRadioButtonsProps) => {
  const {
    onChangeHandler,
    filteredVeiledere,
  } = props;
  return (<>
    {filteredVeiledere.map((veileder: Veileder, index: number) =>
      <StyledRadio
        key={index}
        label={`${veileder.etternavn}, ${veileder.fornavn}`}
        name="veiledereRadioButton"
        onChange={() => onChangeHandler(veileder)}
      />)}
  </>);
};

export const VeilederRadioButtons = ((props: VeilederRadioButtonsProps) => {
  if (props.isInputGiven) {
    return (<div className="veilederRadioButtons--loggedInNotFirst">
        <RadioButtons {...props} />
      </div>);
  }
  return (<LoggedInVeilederFirst className="veilederRadioButtons--loggedInFirst">
    <RadioButtons {...props} />
  </LoggedInVeilederFirst>);
});
