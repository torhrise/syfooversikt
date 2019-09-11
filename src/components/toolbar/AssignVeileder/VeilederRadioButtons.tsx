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

  function getVeilederIdentification(veileder: Veileder): string {
    return veileder.fornavn === '' ? veileder.ident : `${veileder.etternavn}, ${veileder.fornavn}`;
  }

  return (<>
    {filteredVeiledere.map((veileder: Veileder, index: number) =>
      <StyledRadio
        key={index}
        label={getVeilederIdentification(veileder)}
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
